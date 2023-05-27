import React, { useContext} from 'react'
import Home from '../../css/home.module.scss'
import User from './User'
function Userlist({list}) {

 

  return (
    // <ErrorBoundary fallback={<p>Something went wrong</p>}>
  

    <div className={Home.userlist}>
      
      {Object.entries(list ?? []).sort((a,b)=>a.lastMessage?.time-b.lastMessage?.time).map(element=>(
           <User key={element[0]} user={element[1]}/>
      ))}
        
    </div>
    
   
  )
}

export default Userlist