"use client"
import React from 'react'
import { useRouter,useSearchParams } from 'next/navigation';

const ResetPassword = () => {
  const search = useSearchParams()
  const token = search.get('')

  console.log(token);

  return (
    <div>[token]</div>
  )
}

export default ResetPassword