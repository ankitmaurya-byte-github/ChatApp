import React, { useContext, useState } from 'react'
import home from '../../css/home.module.scss'
import { signOut } from 'firebase/auth'
import { auth } from './firebase'
import { Authcontext } from './Authenticatior'

function Navbar() {
  const {userconst}=useContext(Authcontext)
 
  const handel=()=>{
    console.log("before",userconst);
    signOut(auth)
    console.log("aafter",userconst);
  }
  return (
    <div className={home.navbar}>
        <div className={home.logo}> 
        chat app
        </div>
        <div className={home.user}>
            <img src={userconst.photoURL}></img>
            <span>{userconst.displayName}</span>
           
            <span onClick={handel} className="material-symbols-outlined">
logout
</span>
        </div>
    </div>

  )
}

export default Navbar