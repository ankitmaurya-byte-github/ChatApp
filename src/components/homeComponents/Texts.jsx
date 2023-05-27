import React, { useContext, useEffect, useRef } from 'react'
import Home from '../../css/home.module.scss'
import { Chatconst } from './userchats'
import { Authcontext } from './Authenticatior'
function Texts({message}) {
  console.log("text",message);
  const {data}=useContext(Chatconst)
  const {userconst}=useContext(Authcontext)
  const ref=useRef()
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  },[message])
  const user=data.user.uid==message.senderId?data.user:userconst
  return (
    <div ref={ref} className={data.user.uid==message.senderId?Home.Texts:Home.Textsowner}>
        <div className={Home.textinfo}>
            <img src={user.photoURL} alt=''/>
            <span>{user.displayName}</span>
        </div>
        <div className={Home.textcontent}>
            <p>{message.text}</p>
           {message.img && <img src={message.img} alt=''/>}

        </div>

    </div>
  )
}

export default Texts