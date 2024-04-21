import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UserLogin = () => {

    const [user, setuser] = useState()
    const Login=()=>{

        const body ={
            username: "testUser1",
            password : "1"
            }
            console.log(body)
            axios.post('https://5.32.122.147:9090/login/jwt',body )
        .then(res=>{
            localStorage.setItem('user',JSON.stringify(res.data))
            console.log(res)
            alert('login success')
            GetUser()
        })
        .catch(err=>{
            console.warn(err)
        })
    }
    const GetUser =()=>{
        let userdetails =JSON.parse(JSON.stringify(localStorage.getItem('user') ))
        axios.get('https://5.32.112.147:9090/login/user/data',{headers:{'auth-token':userdetails.accessToekn}})
        .then(res=>{
            console.log(res)
        })
    }
useEffect(()=>{
    Login()

})
  return (

    <div>Login</div>
  )
}

export default UserLogin