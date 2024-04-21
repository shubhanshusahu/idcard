import React, { useState } from "react";
import ModeContext from "./ModeContext";


type ThemeContextProviderProps ={
    children : React.ReactNode
}
const ModeState = ({children}:ThemeContextProviderProps)=>{
const [mode, a] = useState({
    color: 'light'
})
// const changeState =(v:string)=>{
//         setmode(v)
// }    
    return(
        <ModeContext.Provider value={{color:mode.color}}>
            {children}
        </ModeContext.Provider>
    )
}


export default ModeState;