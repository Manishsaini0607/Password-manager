import {  NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className=" bg-slate-800 text-white fixed z-10 top-0 w-full px-4 sm:px-0  ">
 <div className="flex h-14 items-center justify-between  max-w-4xl  py-8 mx-auto">
 <div className="font-bold  ">
 <span className="text-green-700"> &lt;</span>
  Pass<span className="text-green-700">Man /&gt;</span>
  </div>
 <ul> 
    <li className="flex gap-4 ">

        <NavLink  to="/"    className={(a)=>a.isActive ? "text-green-700 underline  decoration-white " : " hover:scale-110"}>Home</NavLink>
        <NavLink to="/about"  className={(a)=>a.isActive ? "text-green-700 underline decoration-white" : " hover:scale-110"}>About</NavLink>
        <NavLink to="/contact"  className={(a)=>a.isActive ? "text-green-700 underline decoration-white " : " hover:scale-110"}>Contact</NavLink>
    </li>
 </ul>

 </div>

    </nav>
  )
}
