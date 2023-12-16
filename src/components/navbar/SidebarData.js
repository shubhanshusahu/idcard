import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io';
import * as GiIcons from 'react-icons/gi';
import * as FcIcons from 'react-icons/fc';
import * as TbIcons from 'react-icons/tb';
import * as HiIcons from 'react-icons/hi2';





export const SidebarData = [
  
  {
    title: 'Register School',
    path: '/school',
    icon: <img src="imag/school.png" className='imagesize'/>,
    cName: 'nav-textWithSubmenu',
    submenu:null,

    // submenu: [
    //   {
    //     title: 'Create',
    //     path: '/Patient',
    //     icon: <FaIcons.FaUserInjured color="#fff" />,
    //     cName: 'subnav-text'
    //   },
    // ]
  },
  {
    title: 'Register Student',
    path: '/register',
    icon: <img src="imag/student2.png" className='imagesize'/>,
    cName: 'nav-textWithSubmenu',
    submenu:null,
    // submenu: [
    //   {
    //     title: 'Create',
    //     path: '/Doctor',
    //     icon: <FaIcons.FaUserMd color="#fff" />,
    //     cName: 'subnav-text'
    //   },
      // {
      //   title: 'List',
      //   path: '/Doctors',
      //   icon: <FaIcons.FaClipboardList color="#fff" />,
      //   cName: 'subnav-text'
      // }
    // ]
  },
 
  {
    title: 'Teachers',
    path: '/teachers',
    icon: <img src="imag/teachernew.png" className='imagesize'/>,
    cName: 'minnavtext',
    submenu: null
  },
  {
    title: 'Students',
    path: '/Students',
    icon: <img src="imag/student.png" className='imagesize'/>,
    cName: 'minnavtext',
    submenu: null
  },
  // {
  //   title: 'Medicine',
  //   path: '/Medicine',
  //   icon: <GiIcons.GiMedicines color="#fff" />,
  //   cName: 'minnavtext',
  //   submenu: null
  // },
  {
    title: 'Printing Cards',
    path: '/printing',
    icon: <img src="imag/print.png" className='imagesize'/>,
    cName: 'minnavtext',
    submenu:null,
  //   submenu: [
  //   {
  //     title: 'List',
  //     path: '/Appointments',
  //     icon: <GiIcons.GiMedallist color="#fff" />,
  //     cName: 'minnavtext',
  //     submenu: null
  //   },
  // ]
  },
  {
    title: 'Settings',
    path: '/Settings',
    icon: <img src="imag/setting.png" className='imagesize'/>,
    cName: 'nav-text',
    submenu:null,

    // submenu: [
      // {
      //   title: 'Create',
      //   path: '/Kiosk',
      //   icon: <GiIcons.GiVendingMachine color="#fff" />,
      //   cName: 'subnav-text'
      // },
    //   {
    //     title: 'List',
    //     path: '/Kiosks',
    //     icon: <FaIcons.FaClipboardList color="#fff" />,
    //     cName: 'subnav-text'
    //   }
    // ]
  },


];
