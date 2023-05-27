import React from 'react'
import Home from '../../css/home.module.scss'
import Seearch from './Seearch'

function Searchlist(props) {
  
    return (
        <div className={Home.userlist}>
          
          {props.list.map(element=>(
            <Seearch key={element.uid} addlist={props.addlist} user={element} />
          ))}
            
        </div>
      )
  
}

export default Searchlist