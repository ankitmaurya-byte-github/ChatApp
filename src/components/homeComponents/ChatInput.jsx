import React, { useContext, useState } from 'react'
import Home from '../../css/home.module.scss'
import { updateProfile,getDownloadURL,db,auth,storage,uploadBytesResumable,ref,createUserWithEmailAndPassword } from './firebase'
import { doc, setDoc } from "firebase/firestore"; 
import { Authcontext } from './Authenticatior'
import { v4 as uuid } from 'uuid'
import { Chatconst } from './userchats'
import { Timestamp } from 'firebase/firestore';
import { arrayUnion } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
function ChatInput() {
  const {data}=useContext(Chatconst)
  const {userconst}=useContext(Authcontext)
  const [text,settext]=useState("")
  const [img,setimg]=useState(null)
  const handelsend= async()=>{
   
    if(img){
      
      const storageRef = ref(storage, uuid());
      
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatid), {
              message: arrayUnion({
                id: uuid(),
                text,
                senderId: userconst.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });

          
        }
        );
        if(text.length>0){
          await updateDoc(doc(db, "usersChats", userconst.uid), {
            [data.chatid + ".lastMessage"]: {
              text,
            },
            [data.chatid + ".time"]: serverTimestamp(),
          });
          await updateDoc(doc(db, "usersChats", data.user.uid), {
            [data.chatid + ".lastMessage"]: {
              text,
            },
            [data.chatid + ".time"]: serverTimestamp(),
          });
        }
      }else{
        await updateDoc(doc(db, "chats", data.chatid), {
          message: arrayUnion({
            id: uuid(),
            text,
            senderId: userconst.uid,
            date: Timestamp.now()
          }),
        });

        await updateDoc(doc(db, "usersChats", userconst.uid), {
          [data.chatid + ".lastMessage"]: {
            text,
          },
          [data.chatid + ".time"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "usersChats", data.user.uid), {
          [data.chatid + ".lastMessage"]: {
            text,
          },
          [data.chatid + ".time"]: serverTimestamp(),
        });
    
      }
      settext("")
      setimg(null)
  }
  return (
    <div className={Home.chatinput}>
        <div className={Home.chatinputtext}>
            <input placeholder='type a message' value={text} onChange={(e)=>settext(e.target.value)} type='text'>
            </input>
        </div>
        <div className={Home.chatinputicon}>
        <span  className="material-symbols-outlined">
link
</span> 
      <input  onChange={(e) => setimg(e.target.files[0])} type='file' id='file'/>
    <label htmlFor="file">
<span className="material-symbols-outlined">
photo_library
</span>

    </label>
            <button  onClick={handelsend}>send</button>
        </div>

    </div>
  )
}

export default ChatInput