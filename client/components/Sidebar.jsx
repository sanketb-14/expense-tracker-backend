import React from 'react'
import { useAuth } from '../contexts/UsersContext'
import { FaAnglesRight,FaAlignJustify} from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
const Sidebar = () => {
   const {category} = useAuth()

  return (
   
    
       
      <ul className="join ">
      
        {category.map((list) => {
            return(
                
                <li className="join-item btn btn-sm sm:btn-md m-0 sm:m-2 text-secondary" type="radio" name="options" aria-label="Radio 1"key={list.logo}>
                     <span><FaAnglesRight /></span>
                    {list.categories}
                    
                </li>
                
                
            )
        })}
     
      </ul>
    
   
 
  )
}

export default Sidebar