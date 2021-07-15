import React, {useContext, useRef ,useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { UserContext } from '../App'
import M from 'materialize-css'
import { hasBody } from 'type-is'

const Navbar = () => {

    const searchModel = useRef(null)
    const [search, setSearch] = useState('')
    const [userDetails, setUserDetails] = useState([])
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()

    useEffect(() => {
        M.Modal.init(searchModel.current)
    }, [])

    const renderList = () => {
        if(state){
            return [
                <li key='1'><i data-target="modal1" className="large material-icons modal-trigger" style={{color:'black'}}>search</i></li>,
                <li key='2'><Link to="/profile">Profile</Link></li>,
                <li key='3'><Link to="/create">Create Post</Link></li>,
                <li key='4'><Link to="/myfollowingspost">My following Posts</Link></li>,
                <li key='5'>
                <button className="btn waves-effect waves-light #e53935 red darken-1"
                    onClick={() => {
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push('/signin')
                    }}
                >Logout</button>
                </li>
            ]
        } else {
            return [
                <li key='6'><Link to="/signin">Signin</Link></li>,
                <li key='7'><Link to="/signup">Signup</Link></li>
            ]
        }
    }

    const fetchUsers = (query) => {
        setSearch(query) //we will receive this query in (event.target.value)
        fetch('/search-users', {
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                query 
            })
        })
        .then(res=>res.json())
        .then(results=>{
            setUserDetails(results.user)
        })
    }

    return (
        <nav>
            <div className="nav-wrapper white">
            <Link to={state ? "/":"/signin"} className="brand-logo left">Instagram</Link>
            <ul id="nav-mobile" className="right ">
                {renderList()}
            </ul>
            </div>
            <div id="modal1" className="modal" ref={searchModel} style={{color:"black"}}>
                <div className="modal-content">
                <input 
                    type="text"
                    placeholder="search users"
                    value={search}
                    onChange={(e) =>fetchUsers(e.target.value)}
                />
                <ul className="collection">
                    {userDetails.map(item=>{
                        return <Link to= {item._id !== state._id ?'/profile/'+item._id : '/profile'} onClick={() => {
                            M.Modal.getInstance(searchModel.current).close()
                            setSearch('')
                        }}><li className="collection-item">{item.email}</li></Link> 
                    })}
                </ul>
                </div>
                <div className="modal-footer">
                    <button href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>Close</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
