'use client'
import React from 'react'
import Link from 'next/link'
import {useSelector } from 'react-redux'
import WishlistCard from '../components/wishlist/WishlistCard'

export default function Page() {

  const wishlist = useSelector((state)=>state.wishlist.wishlist)
  if(wishlist.length===0){
    return (
      <div className='w-100 h-[7rem] items-center flex font-bold text-xl justify-center text-red-800'>No product Found <Link href='/deals' className=' ms-1 text-sky-600 underline'> return deals</Link> </div>
    )
  }
  return(
    <div className='w-full flex flex-col items-center gap-5 pt-8 '>
        {
          wishlist.map((e,index)=>{
            return <WishlistCard key={index} data={e}/>
          })
        }
    </div>
  )
}
