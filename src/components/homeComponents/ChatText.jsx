import React, { useEffect, useState } from 'react'
import Home from '../../css/home.module.scss'
import Texts from './Texts'
import { useContext } from 'react'
import { Authcontext } from './Authenticatior'
import { Chatconst } from './userchats'
import { db } from './firebase'
import { onSnapshot ,doc} from 'firebase/firestore'
function ChatText() {
  const [message,setmessage]=useState([]);
  const {data}=useContext(Chatconst);
  console.log(data);
  useEffect(()=>{

    const unSub = onSnapshot(doc(db, "chats", data.chatid), (doc) => {
      if(doc.exists()){
        setmessage(doc.data().message);
        
      }else{

        setmessage([]);
      }
    });

    return () => {
      unSub();
    };
  
  },[data.chatid])
console.log(message);
  return (
    <div className={Home.chatarea}>
      {message.map(element=>(
        <Texts key={element.id} message={element}/>
      ))}

    </div>
  )
}

export default ChatText