'use client'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'

export default function SortStatus({searchParams}) {
    const router = useRouter()
    //SEARCH FUNCTIONALITY
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )
    const handleChange=(e)=>{
        router.push('/orders' + '?' + "status"+ "="+e.target.value)
    }
  return (
    <div  className='flex justify-end pr-6 pt-5 opacity-80'>
        <select className='ml-2 rounded-md h-9 w-6/12' onChange={handleChange} value={searchParams.status}>
        <option value={''}>Sort by status (All)</option>
          <option value={'Pending'}>Pending</option>
          <option value={'Processing'}>Processing</option>
          <option value={'Delivering'}>Delivering</option>
          <option  value={'Delivered'}>Delivered</option>
        </select>
      </div>
  )
}
