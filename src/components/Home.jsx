import React from 'react'
import homecss from '../css/home.module.scss'
import Sidebar from './homeComponents/Sidebar'
import Chats from './homeComponents/Chats'
function Home() {
  console.log("home");
  return (
    <div className={homecss.chatContainer}>
        <div className={homecss.charWrapper}>
        <Sidebar/>
        <Chats/>
        </div>
    </div>
  )
}

export default Home