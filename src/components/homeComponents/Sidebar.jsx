import React, { useContext, useState, useEffect} from 'react'
import Home from '../../css/home.module.scss'
import Navbar from './Navbar'
import Userlist from './Userlist'
import { collection,getDocs, query, where } from "firebase/firestore";
import { db } from './firebase';
import Searchlist from './Searchlist';
import { onSnapshot } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { Authcontext } from './Authenticatior';
function Sidebar(){
  const {userconst}=useContext(Authcontext)
  const [chats,setchats]=useState({})
  const [user,setuser]=useState([])
  const [inputuser,setinputuser]=useState("");
  const [err,seterr]=useState(false)
  useEffect(() => {
    
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "usersChats", userconst.uid), (doc) => {
        setchats(doc.data());
      });
   
      return () => {
        unsub();
      };
    };
    userconst.uid && getChats();
    
  }, [userconst.uid]);


  useEffect(()=>{
    
      try{
        const q = query(collection(db, 'users'));
         const a=async ()=>{
          const querySnapshot = await getDocs(q);
          
          const store=[]
          querySnapshot.forEach((doc) => {
            if (doc.data().displayName.startsWith(inputuser)) {
            store.push(doc.data());
            }
          });
          setuser(store)

        }
        a()
      
      }catch(e){
        seterr(e)
      }
    
  },[inputuser])
  
  return (
    
    <div className={Home.sidebar}>
        <Navbar/>
        <div className={Home.searchbar}>
          <input type='text' value={inputuser} onChange={(e)=>setinputuser(e.target.value.toLowerCase())} placeholder='search-user'/>
        </div>
    {inputuser.length>0? <Searchlist list={user} addlist={()=>{setinputuser("")}}/>:<Userlist list={chats} />}
        
    </div>
  )
}

export default Sidebar