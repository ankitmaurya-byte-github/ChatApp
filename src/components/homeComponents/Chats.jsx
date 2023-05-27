import React from 'react'
import Sidebar from './Sidebar'
import Home from '../../css/home.module.scss'
import ChatInfo from './ChatInfo'
import ChatInput from './ChatInput'
import ChatText from './ChatText'
function Chats() {
  return (
    <div className={Home.chats}>
      <ChatInfo/>
      <ChatText/>
      <ChatInput/>

    </div>
  )
}

export default Chats