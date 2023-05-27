import React, { useContext, useEffect, useState } from 'react'
import Home from '../../css/home.module.scss'
import {collection,query,where,getDocs,setDoc,doc,updateDoc,serverTimestamp,getDoc,} from "firebase/firestore";
import { db } from './firebase'
import { onSnapshot } from 'firebase/firestore';
import { Authcontext } from './Authenticatior'
import { Chatconst } from './userchats';
function Seearch({user,addlist}) {
  const {data,dispatch}=useContext(Chatconst);
    const {userconst}=useContext(Authcontext)
    const [err,seterr]=useState(false)
    
    const handelselect=async (u)=>{
      const combinedId =userconst.uid > u.uid? userconst.uid + u.uid: u.uid + userconst.uid;
      addlist()
        dispatch({type:"change_user" , payload:u})
      
          try{
            const res = await getDoc(doc(db, "chats", combinedId));
              if(!res.exists()){
                //create doc
                await setDoc(doc(db,"chats",combinedId),{message:[]});
    
                await updateDoc(doc(db,"usersChats",userconst.uid),{
                    
                  [combinedId+".userinfo"]:{
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                  },
                  [combinedId+".time"]:serverTimestamp()
                })
                await updateDoc(doc(db,"usersChats",user.uid),{
                  [combinedId+".userinfo"]:{
                    uid: userconst.uid,
                    displayName: userconst.displayName,
                    photoURL: userconst.photoURL,
                  },
                  [combinedId+".time"]:serverTimestamp()
                })
    
              }
          }catch(e){
            console.log(err);
            seterr(true)
          }
    
      }

    return (
    <div className={Home.user} onClick={()=>handelselect(user)}>
        <div className={Home.userinfo}>
            <img src={user.photoURL} alt=''/>
        </div>
        <div className={Home.usermessage}>
            <span>{user.displayName==userconst.displayName?"you":user.displayName}</span>
            <p></p>
        </div>
    </div>
    )
}

export default Seearch