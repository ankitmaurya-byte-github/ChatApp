import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { auth } from './firebase';
export const Authcontext=createContext();
function Authenticatior({children}) {
  console.log("Authenticatior");
    const [userconst,setuserconst]=useState({})
    useEffect(()=>{
        
            const unsub=onAuthStateChanged(auth,user=>{
            setuserconst(user)
           
        })
        return ()=>{
            unsub()
        }
    },[])
  
  return (
    <Authcontext.Provider value={{userconst}}>
        {children}
    </Authcontext.Provider>
  )
}

export default Authenticatior