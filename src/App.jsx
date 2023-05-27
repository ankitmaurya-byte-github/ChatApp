import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Register from './components/Register'
import app from './css/App.module.scss'
import Login from './components/login'
import Home from './components/Home'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Authcontext } from './components/homeComponents/Authenticatior'


function App() {
  console.log("App");
  const {userconst}=useContext(Authcontext)
  
  const Protector=({children})=>{
    if(!userconst){
      console.log("userconst--",userconst);
      return <Navigate to='/login'/>
    }
    
    return children
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Protector>
            <Home/>
            </Protector>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
 
  )
}

export default App
