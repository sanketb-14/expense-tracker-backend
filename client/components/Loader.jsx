import React from 'react'

const Loader = () => {
  return (
    <div className='w-full h-screen  flex justify-center items-center text-2xl font-bold text-secondary' >
        <span className="loading loading-bars loading-lg">Loading...</span>
    </div>
  )
}

export default Loader