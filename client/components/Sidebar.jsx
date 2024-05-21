import React from 'react'
import { useAuth } from '../contexts/UsersContext'
import { FaAnglesRight,FaAlignJustify} from "react-icons/fa6";
import {useTrans} from '../contexts/TransactionsContext'

const Sidebar = () => {
   const {category} = useAuth()
   const {isLoading,getTransactionsByCategories} = useTrans()

   async function handleCLick(category){
   
    console.log(category);
    await getTransactionsByCategories(category)

   }

  return (
   
    
       
      <ul className="join ">
      
        {category.map((list) => {

            return(
                
                <li onClick={()=>handleCLick(list.categories)} className="join-item btn btn-sm sm:btn-md m-0 sm:m-2 text-secondary" type="radio" name="options" aria-label="Radio 1"key={list.logo}>
                     <span><FaAnglesRight /></span>
                    {list.categories}
                    
                </li>
                
                
            )
        })}
     
      </ul>
    
   
 
  )
}

export default Sidebar