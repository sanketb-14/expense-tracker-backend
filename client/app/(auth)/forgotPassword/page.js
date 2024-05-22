"use client"
import React,{useState} from 'react'
import { useRouter } from 'next/navigation'

import {useAuth} from '../../../contexts/UsersContext'

const ForgotPassword = () => {
    const [email , setEmail] = useState('')
    const {forgotPassword} = useAuth()
    const router = useRouter()
    async function handleSubmit(e){
        e.preventDefault()
        console.log(email);
        
        await forgotPassword({email})
        setEmail("")
        alert("Password reset link has been sent to your email")
        router.push('/')

    }


  return (
    <div className='hero bg-bas-300 w-full'>
        <form className='card rounded w-96 ' onSubmit={handleSubmit}>
            <div className='card-body'>
                <div className='form-control'>
                    <label className='label text-secondary'>Email</label>
                    <input className='input input-sm input-bordered' type='email' value={email} name='email' placeholder='Email' onChange={(e) =>setEmail(e.target.value)} />
                </div>
                <div className='form-control'>
                    <button className='btn btn-primary btn-sm btn-block' type='submit'>Reset Password</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default ForgotPassword