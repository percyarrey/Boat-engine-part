'use client'
import React from 'react'
import {usePathname} from 'next/navigation'
export default function Margin() {
    //NAVIGATION
  const pathname =usePathname()
  const isActive = (path) =>{
    return pathname.startsWith(path);
  }
  if(isActive('/auth')){
    return null
  }
  return (
    <div className='mt-[4.1rem] '></div>
  )
}
