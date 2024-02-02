import SidebarItem from "./SidebarItem"
// import items from "./sidebar.json"
import {SidebarData} from './SidebarData'
import './Navbar.css'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function Sidebar(props:any){
  // const [sidebar, setSidebar] = useState(props.side);
const {sidebar,user}= useSelector((state:any)=> state.RootRed)
let navigate = useNavigate();

  // const showSidebar = () => setSidebar(!sidebar);
  // useEffect(() => {
  //   setSidebar(props.side)
  // }, [props.side])
  const [filterusingRoles, setfilterusingRoles] = useState<any>(null)
useEffect(() => {
let u = JSON.parse(localStorage.getItem('user') || 'null')
console.log(u,'uuuuuuuuuuuu')
if(u==null){
navigate('/login')
}
else
{
  let a = SidebarData.filter(d=> d.role.includes(u?.userrole || 'teacher'))

console.log(a,'filter using roles',user.userrole)
setfilterusingRoles(a)}
}, [])

    return (
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <div className={sidebar ? 'sidebar' : ' sidebar smallsidebar'}>
        <Link to='/'> <li className='navbar-toggle'>
              {sidebar ? <img src="imag/logorec.jpg" className="fulllogo" alt="logo" />

                :
                <img src="./imag/logosquare.jpg" className="fulllogo" alt="logo" />}

            </li>
            </Link>
          {filterusingRoles !=null && filterusingRoles?.map((item: any, index: any) => <SidebarItem sidebar={props.side} key={index} item={item} />) }
        </div>
        </nav>
    )
}