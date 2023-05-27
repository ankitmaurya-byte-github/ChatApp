import React, { useEffect, useState } from 'react'
import Home from '../../css/home.module.scss'
import { useContext } from 'react'
import { Authcontext } from './Authenticatior'
import {collection,query,where,getDocs,setDoc,doc,updateDoc,serverTimestamp,getDoc,} from "firebase/firestore";
import { db } from './firebase'
import { onSnapshot } from 'firebase/firestore';
import { Chatconst } from './userchats';
function User({user}) {
  const {data,dispatch}=useContext(Chatconst)
  const {userconst}=useContext(Authcontext)
  const [err,seterr]=useState(false)
  const [chats,setchats]=useState({})
  const handelselect=(user)=>{
      dispatch({type:"change_user" , payload:user.userinfo})

  }
  
  return (
    // <div className={data.user?.uid==user.userinfo?.uid?`${Home.user} ${Home.userselect}`:Home.user} onClick={()=>handelselect(user)}>
    <div className={Home.user} onClick={()=>handelselect(user)}>
        <div className={Home.userinfo}>
            <img src={user.userinfo.photoURL} alt=''/>
        </div>
        <div className={Home.usermessage}>
            <span>{user.userinfo.displayName==userconst.displayName?"you":user.userinfo.displayName}</span>
            <p>{user.lastMessage?.text}</p>
        </div>
    </div>
  )
}

export default User