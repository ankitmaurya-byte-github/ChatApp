import React,{useState,useContext,useEffect} from 'react'
import registercss from '../css/register.module.scss'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './homeComponents/firebase'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Chatconst } from './homeComponents/userchats'


function Login() {
  console.log("login");
  const navigate=useNavigate()
  const [err,seterr]=useState(false)
  const {data,dispatch}=useContext(Chatconst);
  const submithandler=async (e)=>{
    e.preventDefault()
    const email=e.target[0].value
    const password=e.target[1].value
  

    try{

     await signInWithEmailAndPassword(auth, email, password)
      dispatch({type:"reset" })
      navigate("/")

    }catch(err){
      console.log("-login-errr---",err);
      seterr(true)
    }
 

  }

  return (
    <div className={registercss.registerContainer}>
      <span>Login</span>
      <form onSubmit={submithandler}>
        <input type='text ' placeholder='username' />
        <input type='password' placeholder='password'/>
        <button>SINin</button>
        {err && <span> somthing wrong</span>}
      </form>
      
        <p>you dont have account ?<Link to='/register'>Register</Link> </p>
    </div>
  )
}

export default Login