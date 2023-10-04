'use client'
import Link from 'next/link'
import React from 'react'

export default function Recentorder({e}) {
    console.log(e)
    /* var date= new Date(e.date) */
  return (
    <div className='py-4 px-2 flex justify-between'>
    {/* <div className=' font-semibold'>
        {e.OrderId}
    </div>
    <div>
        {date.getDate()}-{date.toLocaleString('en-US', { month: 'short' })}-{date.getFullYear()} - {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
    </div> */}
    <div>
        <Link className='bg-[#0E9F6E] p-2 rounded-md shadow-sm text-white' href={'/trackorder/'/* e.OrderId */}>Track Order</Link>
    </div>
    </div>
  )
}
