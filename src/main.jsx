import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Authenticatior from './components/homeComponents/Authenticatior.jsx'
// import mainCss from './css/Main.module.scss'
import Userchats from './components/homeComponents/userchats.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Authenticatior>
    <Userchats>
  {/* <React.StrictMode> */}
    <App />
  {/* </React.StrictMode>, */}
  </Userchats>
  </Authenticatior>
)
