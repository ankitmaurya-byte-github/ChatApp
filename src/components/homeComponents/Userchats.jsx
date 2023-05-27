import React, { useReducer ,useContext, createContext} from 'react'
import { Authcontext } from './Authenticatior'
export const Chatconst=createContext()
function Userchats({children}) {
    const {userconst}=useContext(Authcontext)
    const initialstate={
        chatid:"null",
        user:{}
    }
    const reducer=(state,action)=>{
        switch(action.type){
            case "change_user":
                return {
                    user: action.payload,
                    chatid:
                      userconst.uid > action.payload.uid
                        ? userconst.uid + action.payload.uid
                        : action.payload.uid + userconst.uid,
                  };
            case "reset":
            return { chatid:"null",
        user:{}}
            default:
                return state
        }
    }
    const [state,dispatch]=useReducer(reducer,initialstate);
  return (
    <Chatconst.Provider value={{data:state ,dispatch}}>
        {children}
    </Chatconst.Provider>
  )
}

export default Userchats