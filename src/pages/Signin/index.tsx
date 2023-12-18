import React from 'react'
import './signin.css'
import {motion} from 'framer-motion'
import { TextField } from '@mui/material'
const Login = () => {
  return (
    <div className="containerlogin" style={{backgroundImage: `url("https://wallpapers.com/images/hd/abstract-blue-background-3840-x-2160-c72bkjukrvhvv4v2.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    }}>
      <motion.div 
      animate={{
        y:0,
      }}
      transition={{delay :0.5, duration :0.8,type :"spring",bounce:0.5}}
      initial = {{y:-500}}
      
      className='bound'>
       <form className='form'>
        <h4>Login</h4>
       <div className="input-container">
         {/* <label>Username </label> */}
         <TextField
        className="inp"
        color='info'
        autoFocus
          label="Username"
          id="standard-size-small"
          defaultValue=""
          size="small"
          variant="standard"
          required
        />
         
       </div>
       <div className="input-container">


         <TextField
        className="inp"
        autoComplete='false'
          color='info'
          label="Password"
          type='password'
          id="standard-size-small"
          defaultValue=""
          size="small"
          variant="standard"
          required
        />
       </div>
       <div className="button-container">
         <motion.input
         
         animate={{
            scale:1
          }}
          transition={{delay :2, duration :0.8,type :"spring",bounce:0.5}}
          initial = {{scale:0}}
         
         type="submit"  className="btn btn-primary btnsubmitdetails" />
         <motion.button 
          animate={{
            scale:1
          }}
          transition={{delay :2, duration :0.8,type :"spring",bounce:0.5}}
          initial = {{scale:0}}
         
         className='btn btn-secondary btnsx'>Clear</motion.button>
       </div>
     </form>
      </motion.div>
    </div>
  )
}

export default Login
