import React, { useEffect, useState, Suspense, lazy } from 'react'
import StudentReg from '../components/StudentReg/StudentRegisteration'
import Print from '../pages/Print'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import './route.css'
import { Sling as Hamburger } from 'hamburger-react'
import Sidebar from '../components/navbar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';

import { FaIcons } from 'react-icons/fa';
import * as Aiicons from 'react-icons/ai';

function Home() {
  let navigate = useNavigate();
  //  const user= useSelector((state: any)=>state.RootRed)

  useEffect(() => {

    // if (!localStorage.getItem('user')) {
    //   navigate('/login')
    //   return;
    // }
  }, [])


  return <div className="rightpart closehead">Hi Admin<span className='useravtar'><img src="imag\Teacher.png" style={{width:'30px'}}/></span></div>;
}

const Dashboard = () => {
  return (
    <div className='mincontanor'>
      <div>dashboard</div>
    </div>

  )
}
export default function Rout() {
  const { device, sidebar } = useSelector((state: any) => state.RootRed)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [side, setside] = useState(true)
  const [navvisible, setnavvisible] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {

    const pathname = window.location.pathname.toLowerCase();
    if (pathname === '/login'.toLowerCase()
      || pathname === '/RegisterYourself'.toLowerCase() 
      || pathname === '/RegisterYourself/form'.toLowerCase()) {
      setnavvisible(false)
    }
  }, [])

  return (
    <Router>
      <div className='overall'>
        {navvisible &&
          // <Navbar side={side} />
          <Sidebar side={side} />
        }
        <div className='secondhalf'>
          <div className='menu-bars' onClick={() => dispatch({
            type: 'togglenavbar'
          })}>
            {navvisible &&
              <div className='headeruser'>
                <Hamburger color="#243A6C" direction="right" distance="md" duration={0.8} />
               <h5>ALPHA X</h5>
                <Home />
              </div>
            }
          </div>
          {device === 'mobile' && sidebar === true ? '' :
            <Routes>
             
              <Route path="/register" element={<StudentReg />} />
              <Route path="/printing" element={<Print />} />

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
