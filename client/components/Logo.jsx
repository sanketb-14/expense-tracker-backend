import React from 'react'
import logo from '../public/assets/main_manage.svg'
import Image from 'next/image'

const Logo = () => {
  return (
    <div className=''>
        <Image src={logo} alt="logo" width={100} height={100} />
        <h1 className='tracking-wide sm:tracking-wider text-xl sm:text-3xl font-semibold text-primary hidden sm:inline'>The Expense Tracker</h1>
    </div>
  )
}

export default Logo