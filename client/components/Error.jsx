"use Client"
import React from 'react'
import { useAuth } from '../contexts/UsersContext'


const Error = () => {
    const {error} = useAuth()
    
    if (!error) return null;
   const {status , message} = error
  return (
    <div role="alert" className={`${error.message && "alert"} ${status === "fail" || status === "error" ? "alert-error"  : "alert-success"} `}>
        {message}
    </div>
);
}

export default Error