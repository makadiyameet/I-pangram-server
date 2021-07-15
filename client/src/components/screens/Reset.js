import React, {useState, useContext} from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'


const Reset = () => {

    const history = useHistory()
    const [email, setEmail] = useState('')
    const PostData = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email", classes:"#f44336 red"})
            return
        }
        fetch("/reset-password", {
            method:'post',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                email
            })
        })
        .then(res=>res.json())
        .then(data=>{
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
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) =>setEmail(e.target.value)}
                />
                <button className="btn waves-effect waves-light #42a5f5 blue darken-1"
                    onClick={() => PostData()}
                >Reset Password</button>
            </div>
        </div>
    )
}

export default Reset