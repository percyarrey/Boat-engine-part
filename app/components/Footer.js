'use client'
import Image from 'next/legacy/Image'
import Link from 'next/link'
import React from 'react'
import {usePathname} from 'next/navigation'
import { BsQuestionCircle } from 'react-icons/bs'
 function Footer() {
  //NAVIGATION
  const pathname =usePathname()
  const isActive = (path) =>{
    return pathname === path;
  }
  if(isActive('/login') || isActive('/signup')){
    return null
  }
   return (
     <div className=' bg-zinc-50 relative w-full'>
        <div className='flex flex-wrap px-1 lg:px-6'>
          <div className='w-6/12 md:w-3/12 h-full'>
            <Link href='/' className="flex items-center">
                <Image src="/logo.png"
                height={60} width={60} alt="Creativepart"/>
                <span className="self-center  hidden  sm:flex text-2xl font-bold  whitespace-nowrap mytxt">{"CreativePart's"}</span>
            </Link>
            <p className=' text-sm'>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            </p>
            <h5 className=' font-semibold mt-1'>Accepted Payments</h5>
            <div className='relative h-7'>
              <Image src="/stripe.png"
                layout='fill' objectFit='contain' alt="Creativepart"/>
            </div>
          </div>
          <div className='w-6/12 md:w-3/12 h-full'>
            <h5 className=' font-bold'>About Us</h5>
          </div>
          <div className='w-6/12 md:w-3/12 h-full'>
            <h5 className=' font-bold'>Contact Us</h5>
          </div>
          <div className='w-6/12 md:w-3/12 h-full'>
            <h5 className=' font-bold'>Help</h5>
            <div className='mt-1 flex flex-col'>
              <Link className='relative hover:text-[#C34482] hover:top-[0.08rem] hover:left-[0.08rem]' href={'/contact'}>Contact Us</Link>
              <Link className='relative hover:text-[#C34482] hover:top-[0.08rem] hover:left-[0.08rem]'  href={'/contact'}>Track Orders</Link>
              <Link className='relative hover:text-[#C34482] hover:top-[0.08rem] hover:left-[0.08rem]'  href={'/contact'}>Feedback</Link>
              <Link className='relative hover:text-[#C34482] hover:top-[0.08rem] hover:left-[0.08rem]'  href={'/contact'}>Security & Fraud</Link>
            </div>
          </div>
        </div>
        <hr/>
        <div className=' px-1 lg:px-6 flex flex-wrap justify-between gap-x-4'>
          <div className='flex gap-1 items-center'>
            <BsQuestionCircle color='#C34482' fontSize={21}/>
            <Link className=' hover:text-[#C34482]' href={"/contact"}>Help Center</Link>
          </div>
          <div className='flex gap-1 items-center'>
            <Link className=' hover:text-[#C34482]' href={"/contact"}>Terms of Service</Link>
          </div>
          <div className='flex gap-1 items-center'>
            <Link className=' hover:text-[#C34482]' href={"/contact"}>Privacy and Security</Link>
          </div>
          <div>
            &copy;Copyright 2023. All Right reserved by &nbsp; <Link href={'/'}><b className=' mytxt'>Creative {"Part's"}</b></Link>
          </div>
      </div>
     </div>
   )
 }
 
 export default Footer