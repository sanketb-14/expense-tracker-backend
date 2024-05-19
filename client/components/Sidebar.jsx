import React from 'react'
import { useAuth } from '../contexts/UsersContext'
import { FaAnglesRight,FaAlignJustify} from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
const Sidebar = () => {
   const {category} = useAuth()

  return (
    <section className="drawer lg:drawer-open w-1/3 sm:w-1/4">
    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col items-center justify-center">
      {/* Page content here */}
      <label htmlFor="my-drawer-2" className="btn bg-transparent font-bold text-xl drawer-button lg:hidden absolute left-0">
        <span><FaAlignJustify /></span>
      </label>
    
    </div> 
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      <label htmlFor="my-drawer-2" className="btn bg-transparent text-2xl font-bol drawer-button lg:hidden ">
        <span><IoCloseSharp /></span>
      </label>
        
        {category.map((list) => {
            return(
                
                <li className='menu text-sm sm:text-md flex justify-start w-full items-start border-b-2 border-secondary outline-none border-0  text-white' key={list.logo}>
                     <a ><span><FaAnglesRight /></span>
                    {list.categories}</a>
                    
                </li>
                
                
            )
        })}
     
      </ul>
    
    </div>
  </section>
  )
}

export default Sidebar