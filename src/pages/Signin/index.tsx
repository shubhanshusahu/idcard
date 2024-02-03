import React, { useState } from 'react'
import './signin.css'
import { motion } from 'framer-motion'
import { TextField } from '@mui/material'
import { GetReq, PostReq } from '../../components/HttpReqs'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
const Login = () => {
  const [username, setusername] = useState('')
  const [pass, setpass] = useState('')


  const dispatch = useDispatch()
  let navigate = useNavigate()
  const login = async () => {
    console.log({ username, pass },'body')
    const res = await PostReq('login', { username, pass })
    if (res.data.length != 0) {
      console.log(res,'res')
      localStorage.setItem('user', JSON.stringify(res.data[0]))
      dispatch({
        type: 'userlogin',
        payload: res.data[0]
      })
      dispatch({
        type: 'navVisible',
        payload: true
      })
      if (res.data[0].userrole == 'teacher') {
        const schooldetails = GetReq(`school?idSchool=${res.data[0].schoolid}`)
        
        schooldetails.then(
          sd => {
            console.log(sd?.data[0],'inside')
            dispatch({
              type: 'userlogin',
              payload: { ...res.data[0], ...sd?.data[0] }
            })
             localStorage.setItem('user', JSON.stringify({ ...res.data[0], ...sd?.data[0] }))
          }
        )

      }
      // console.log(user,'user')
      navigate('/')

    }
    else {
      alert('User email or password is wrong!')
    }
    console.log(res, 'login response')
  }
  return (
    <div className="containerlogin" style={{
      backgroundImage: `url("https://wallpapers.com/images/hd/abstract-blue-background-3840-x-2160-c72bkjukrvhvv4v2.jpg")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }}>
      <motion.div
        animate={{
          y: 0,
        }}
        transition={{ delay: 0.5, duration: 0.8, type: "spring", bounce: 0.5 }}
        initial={{ y: -500 }}

        className='bound'>
        <form className='form'>
          <h4>Login</h4>
          <div className="input-container">
            {/* <label>Username </label> */}
            <TextField
              value={username}
              onChange={e => setusername(e.target.value)}
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
              value={pass}
              onChange={e => setpass(e.target.value)}
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
                scale: 1
              }}
              transition={{ delay: 2, duration: 0.8, type: "spring", bounce: 0.5 }}
              initial={{ scale: 0 }}

              type="button" value="submit" onClick={() => login()} className="btn btn-primary btnsubmitdetails" />
            <motion.button
              animate={{
                scale: 1
              }}
              transition={{ delay: 2, duration: 0.8, type: "spring", bounce: 0.5 }}
              initial={{ scale: 0 }}

              className='btn btn-secondary btnsx'>Clear</motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default Login
