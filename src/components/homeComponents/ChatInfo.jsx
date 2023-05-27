import React,{useContext} from 'react'
import { Chatconst } from './userchats'
import Home from '../../css/home.module.scss'
function ChatInfo() {
  const {data}=useContext(Chatconst)
  return (
    <div className={Home.chatInfo}>
        <div className={Home.chatInfoName}>
            <span>{data.user?.displayName}</span>
        </div>
        <div className={Home.chatInfoCall}>
            <span className="material-symbols-outlined">
video_call
</span>
<span className="material-symbols-outlined">
person_add
</span>
<span className="material-symbols-outlined">
list
</span>
        </div>
    </div>
  )
}

export default ChatInfo