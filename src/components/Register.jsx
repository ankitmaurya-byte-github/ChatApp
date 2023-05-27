import React, { useState } from 'react'
import registercss from '../css/register.module.scss'
import { updateProfile,getDownloadURL,db,auth,storage,uploadBytesResumable,ref,createUserWithEmailAndPassword } from './homeComponents/firebase'
import { doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom';



function Register() {
  console.log("Register");
  const navigate=useNavigate()
  const [err,seterr]=useState(false)
  const submithandler=async (e)=>{
    e.preventDefault()
    const username = e.target[0].value.toLowerCase();
    const email=e.target[1].value
    const password=e.target[2].value
    const file=e.target[3].files[0]
  

    try{

      let res =await createUserWithEmailAndPassword(auth, email, password)
      const storageRef = ref(storage, username);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          console.log("register eerr",error);
          seterr(true);
        }, 
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateProfile(res.user,{
              displayName:username,
              photoURL:downloadURL
            })
            await setDoc(doc(db, "users", res.user.uid), {
              uid:res.user.uid,
              email,
              displayName:username,
              photoURL:downloadURL,
              password
            });
            await setDoc(doc(db, "usersChats", res.user.uid), {});
           
          });
        }
        );
        
        navigate("/")
     console.log(res);

    }catch(err){
      console.log("--register-err--",err);
      seterr(true)
    }
 

  }

  return (
    <div className={registercss.registerContainer}>
      <span className={registercss.logo}>Chat app</span>
      <span>register</span>
      <form onSubmit={submithandler}>
        <input type='text ' placeholder='username' />
        <input type='email' placeholder='email'/>
        <input type='password' placeholder='password'/>
        <input type='file' id='file' />
        <label htmlFor='file'>
        <span className="material-symbols-outlined">
add_a_photo
</span>
        <span>add an avatar</span>
        </label>
        <button type='submit'>SINUP</button>
        {err && <span> somthing wrong</span>}
      </form>
      
        <p>do you alredy have account ?<Link to='/login'>Login</Link> </p>
    </div>
  )
}

export default Register