import React from 'react'
import { BsCheck2Circle } from 'react-icons/bs'
import Link from 'next/link'
export default function Page() {
  
  return (
    <div className=' flex flex-col items-center'>
      <div className='flex font-semibold text-md gap-5 text-[#577A71]'><BsCheck2Circle  size={23}/> Order placed, thank you.</div>
      <div className='  opacity-70'>Confirmation will be sent to your email</div>
      <Link  className=' text-sky-500 underline' href={'/deals'}>See more Product</Link>
    </div>
  )
}
