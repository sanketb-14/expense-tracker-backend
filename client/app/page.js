import React from 'react'
import mainPic from '../public/assets/main_manage.svg'
import Image from 'next/image'
import Link from 'next/link'


const HomePage = () => {
  return (

    <div className="hero min-h-screen " >
      <Image src={mainPic} width={900} height={400} objectFit="cover" className='' alt="main_logo"  />
    
      
    <div className="hero-overlay bg-opacity-40 "></div>
    <div className="hero-content text-center text-neutral-content flex">
      <div className="max-w-md sm:max-w-2xl mt-8 absolute top-0">
        <h1 className="mb-5 text-5xl font-bold text-secondary">Welcome!!!</h1>
        <p className="mb-5"><span className='text-3xl font-semibold text-accent'> The expense tracker app</span> Provide the best way to manage your day to day expense tracking
        </p>
        <button className="btn btn-accent inline sm:absolute btn-lg btn-wide right-0">
          <Link href="/login">
            Get Started
          </Link>
        </button>
      </div>
    </div>
  </div>
  )
}

export default HomePage