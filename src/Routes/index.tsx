import React, { useEffect, useState, Suspense, lazy } from 'react'
import StudentReg from '../components/StudentReg/StudentRegisteration'
import Print from '../pages/Print'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,

} from "react-router-dom";
import './route.css'
import { Sling as Hamburger } from 'hamburger-react'
import Sidebar from '../components/navbar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';

import { FaIcons } from 'react-icons/fa';
import * as Aiicons from 'react-icons/ai';
import Login from '../pages/Signin';
import School from '../pages/School';
import Teachers from '../pages/Teacher';
import StudentPage from '../pages/StudentReg';
import Student from '../pages/Student/index';

function Home() {
  let navigate = useNavigate();
   const {user}= useSelector((state: any)=>state.RootRed)

  useEffect(() => {

    // if (!localStorage.getItem('user')) {
    //   navigate('/login')
    //   return;
    // }
  }, [])


  return <div className="rightpart closehead">Hi {user?.username || ''}<span className='useravtar'><img 
  // onClick={()=>{    navigate('/login')  }}
   src="imag\Teacher.png" style={{width:'30px'}}/></span></div>;
}

const Dashboard = () => {
  const pathname = window.location.pathname.toLowerCase();
  let navigate = useNavigate();

  useEffect(() => {
  if(pathname =='/' && localStorage.getItem('user')==null){
    navigate('/login')
  }
  }, [])

  return (
    <div className='mincontanor'>
      <div>dashboard</div>
    </div>

  )
}
export default function Rout() {
  const { device, sidebar,navVisible,user } = useSelector((state: any) => state.RootRed)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [side, setside] = useState(true)

  const dispatch = useDispatch()
  useEffect(() => {

    const pathname = window.location.pathname.toLowerCase();
    if (pathname === '/login'.toLowerCase()
      || pathname === '/register'.toLowerCase() 
      || pathname === '/RegisterYourself/form'.toLowerCase()) {
        dispatch({
          type: 'navVisible',
          payload:false
        })
    }

  }, [])

  return (
    <Router>
      <div className='overall'>
        {navVisible &&
          // <Navbar side={side} />
          <Sidebar side={side} />
        }
        <div className='secondhalf'>
          <div className='menu-bars' >
            {navVisible &&
              <div className='headeruser'>
                <Hamburger onToggle={() => dispatch({
                type: 'togglenavbar'
              })} color="#243A6C" direction="right" distance="md" duration={0.8} />
               <h5>{user.userrole=='teacher'? user.SchoolnName : 'ALPHA X'}</h5>
                <Home />
              </div>
            }
          </div>
          {device === 'mobile' && sidebar === true ? '' :
            <Routes>
             
              <Route path="/register" element={<StudentReg />} />
              <Route path="/printing" element={<Print />} />
              <Route path="/login" element={<Login />} />
              <Route path="/school" element={<School />} />
              <Route path="/teacher" element={<Teachers />} />
              <Route path="/students" element={<Student />} />




              <Route path="/" element={<Dashboard />} />
              {/* <Route path="*" element={<Dashboard/>} /> */}
            </Routes>
          }
          {/* footer here */}
        </div>
      </div>
    </Router>
  )
}
