import React, {useState, useContext} from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import M from 'materialize-css'


const Signin = () => {

    const history = useHistory()
    const [password, setPassword] = useState('')
    const {token} = useParams()
    console.log(token)

    const PostData = () => {
        
        fetch("/new-password", {
            method:'post',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                password,
                token
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error, classes:"#f44336 red"})
            } else {
                M.toast({html:data.message, classes:"#64dd17 light-green accent-4"})
                history.push('/signin')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input 
                    type="password"
                    placeholder="enter a new password"
                    value={password}
                    onChange={(e) =>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #42a5f5 blue darken-1"
                    onClick={() => PostData()}
                >Update Password</button>
            </div>
        </div>
    )
}

export default Signin
