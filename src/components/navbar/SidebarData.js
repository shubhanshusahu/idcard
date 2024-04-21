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
    title: 'School',
    path: '/school',
    role: 'admin',
    icon: <img src="imag/school.png" className='imagesize'/>,
    cName: 'nav-textWithSubmenu',
    submenu:null,

  },
  {
    title: 'Register Student',
    path: '/register',
    role:'teacher,admin,student',
    icon: <img src="imag/student2.png" className='imagesize'/>,
    cName: 'nav-textWithSubmenu',
    submenu:null,

  },
 
  {
    title: 'Teachers/Admin',
    path: '/teacher',
    role:'admin',
    icon: <img src="imag/teachernew.png" className='imagesize'/>,
    cName: 'minnavtext',
    submenu: null
  },
  {
    title: 'Students',
    path: '/Students',
    role:'teacher,admin',
    icon: <img src="imag/student.png" className='imagesize'/>,
    cName: 'minnavtext',
    submenu: null
  },
  {
    title: 'Printing Cards',
    path: '/printing',
    role:'teacher,admin',
    icon: <img src="imag/print.png" className='imagesize'/>,
    cName: 'minnavtext',
    submenu:null,
  },
  {
    title: 'Settings',
    path: '/settings',
    role:'admin',
    icon: <img src="imag/setting.png" className='imagesize'/>,
    cName: 'nav-text',
    submenu:null,

  },


];
