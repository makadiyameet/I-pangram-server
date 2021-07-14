import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css'


const CreatePost = () => {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    useEffect(() =>{
        if(url){
            fetch("/createpost", {
                method:'post',
                headers:{
                    'Content-type':'application/json',
                    'Authorization':'Bearer '+localStorage.getItem('jwt')
                },
                body:JSON.stringify({
                    title,
                    body,
                    pic:url
                })
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html: data.error, classes:"#f44336 red"})
                } else {
                    M.toast({html:'created post successfully', classes:"#64dd17 light-green accent-4"})
                    history.push('/')
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }    
    }, [url])

    const postDetails = () => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', "insta-clone") //insta-clone from cloudinary
        data.append('cloud_name', "meet1") //It is also form cloudinary
        fetch("https://api.cloudinary.com/v1_1/meet1/image/upload", {
            method: 'post',
            body:data
        })
        .then(res=> res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className='card input-field' 
        style={{
            margin: '30px auto', 
            maxWidth:'500px', 
            padding:'20px', 
            textAlign:'center'}}>
            <input type="text" placeholder="title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input type="text" placeholder="body" 
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <div className="file-field input-field ">
                <div className="btn #42a5f5 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #42a5f5 blue darken-1"
                onClick={()=>postDetails()}
            >Submit Post</button>
        </div>
    )
}

export default CreatePost
