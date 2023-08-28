'use client'
import React, { useEffect, useRef, useState } from 'react'
//LINK
import Link from 'next/link'
import {usePathname} from 'next/navigation'


import { Badge,  IconButton,  Tooltip, Typography } from "@mui/material"

//ICONS
import {BsArrowBarLeft, BsCart, BsHeart, BsX} from 'react-icons/bs'
import {AiOutlineUser,AiOutlineHeart} from 'react-icons/ai'
import {FaUser} from 'react-icons/fa'

//COMPONENT
import SearchBar from "./header/SearchBar"
import Image from "next/image"

//NEXT AUTH
import { signOut, useSession } from 'next-auth/react';

//REDUX
import {useSelector} from 'react-redux'
function Header() {
  //REACT REDUX
  const wishlist = useSelector((state)=>state.wishlist.wishlist)
  
  //SESSION
  const { data, status,loading } = useSession()

  //NAVIGATION
  const pathname =usePathname()
  const isActive = (path) =>{
    return pathname === path;
  }
  
  const [Menu,setMenu] = useState(false)

  //HANDLE SEARCHING
  const SearchHiding = useRef(null)
  const handleSearchToggle =(e)=>{
    if(SearchHiding?.current!==undefined){
      /* DIV */
      SearchHiding.current.querySelectorAll('div').forEach(k => {
        if(k.id==='toggle'){
          k.classList.toggle('hidden')
        }else if(k.id==='backbtn'){
          k.classList.toggle('hidden')
        }
      });
      NavbarClose()
    }
  }

  //HANDLE NAVBAR
  const handleNavbar =(e)=>{
      document.getElementById('navbar-sticky').classList.toggle('hidden')
      setMenu(prev=>!prev)
      if(document.getElementById('NavbarClose').classList.contains('hidden')){
        document.getElementById('NavbarClose').classList.toggle('hidden')
      }
  }
  const handleDropdown =(e)=>{
    document.getElementById('user-dropdown').classList.toggle('hidden')
    document.getElementById('user-dropdown').classList.toggle('absolute')
  }
  const DropdownClose =(e)=>{
    document.getElementById('user-dropdown').classList.toggle('hidden')
    document.getElementById('user-dropdown').classList.toggle('absolute')
  }
  const NavbarClose =(e)=>{
    document.getElementById('navbar-sticky').classList.add('hidden')
    setMenu(false);
    if(e!==undefined){
      e.target.classList.toggle('hidden')
    }
  }
  if(isActive('/login') || isActive('/signup')){
    return null
  }
  return (
    <>
    <header>

    {/* NAVIGATION HEADER */}
      <nav className="fixed h-[4rem] bg-white w-full z-20  left-0 border-b  border-gray-200 dark:border-gray-600 lg:px-8 pl-2">
        <div ref={SearchHiding} className="flex flex-wrap  items-center  mx-auto py-4 w-full  justify-between">
        <Link href='/' className="flex w-2/12 mb-3 sm:w-4/12 md:w-3/12 items-center">
            <Image src="/logo.png"
            height={60} width={60} style={{width:'auto',height:'auto'}} className=" mr-3" alt="Creativepart"/>
            <span className="self-center  hidden  sm:flex text-2xl font-bold  whitespace-nowrap mytxt">{"CreativePart's"}</span>
        </Link>
        {/* SEARCH BAR */}
        <div className=" lg:order-2 flex-1 px-2 sm:px-7 lg:px-5 lg:max-w-[424px] flex justify-between gap-1" >
          <SearchBar handleSearchToggle={handleSearchToggle}/>
          <div id="backbtn"  className="hidden lg:hidden items-center pb-2 ">
            <button onClick={handleSearchToggle} className=" bg-slate-50 py-2 px-1 border-slate-200 rounded-md">
              <BsArrowBarLeft size={24}/>
            </button>
          </div>
        </div>
        <div id='toggle' className="flex w-4/12 sm:w-2/12 lg:w-1/12 justify-end lg:flex lg:order-3">
            
            {/* ACCOUNT */}
            <Tooltip title='Account' className='relative top-[-0.5rem]'>
              <button type="button" onClick={handleDropdown} className="flex justify-center items-center text-sm bg-transparent w-8 h-8 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 mt-2" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                <span className="sr-only">Open user menu</span>
                {
                  status==='authenticated' ?
                    <FaUser size={32} className="w-8 h-8 rounded-full"/>:
                    <AiOutlineUser size={32} className="w-8 h-8 rounded-full"/>
                }
              </button>
            </Tooltip>           
        
            <div className="z-10 hidden top-[2.6rem] right-[3rem] my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 " id="user-dropdown">
              <button className='w-[100vw] z-[-1] h-[100vh] cursor-default fixed top-0 left-0' onClick={DropdownClose}></button>
                
              {
                status === 'authenticated'?
                  <>
                    <div className="px-4 py-3 z-10">
                      <span className="block text-sm text-gray-900 dark:text-white">{
                        data?.user?.name
                      }</span>
                      <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{
                        data?.user?.email
                      }</span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      
                      {
                        data?.user?.role ==='admin'&&
                          <>
                            <li>
                              <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link>
                            </li>
                            <li>
                              <Link href="/manageproduct" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Add Product</Link>
                            </li>
                          </>
                          
                      }
                      <li>
                        <Link href="/wishlist" className="flex justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Wishlist <div className=' text-white rounded-full bg-red-900 px-2'>{wishlist.length}</div></Link>
                      </li>
                      <li>
                        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</Link>
                      </li>
                      <li>
                        <button onClick={()=>{signOut()}} className="block px-4 py-2 w-full text-start text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                      </li>
                    </ul>
                  </>:
                  <>
                  <div className="px-0 py-3">
                    <ul className="py-0" aria-labelledby="user-menu-button">
                    <li>
                        <Link href="/login" className="block min-w-[8rem] text-center px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-md dark:text-gray-200 dark:hover:text-white">Login</Link>
                      </li>
                      <hr/>
                      <li>
                            <Link href="/signup" className="block px-4 py-2  text-center text-md w-full text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign Up</Link>
                      </li>
                      </ul>
                  </div>
                    
                  </>
              }
            </div>
            {/* WISHLIST */}
            <Link href={'/wishlist'} style={{display:'flex',textDecoration:'none',color:'black'}}>
              <Tooltip title='Wishlist'  className=" relative -top-[0.3rem]">
                <IconButton size="large" aria-label="carts" color="inherit">
                  <Badge badgeContent={wishlist.length} color="error">
                    <div>
                      <BsHeart color='darkred' size={23}/>
                    </div>
                  </Badge>
                </IconButton>
              </Tooltip>
              </Link>
            <div className='relative top-[-0.2rem]'>
              <button data-collapse-toggle="navbar-sticky" onClick={handleNavbar} type="button" className="inline-flex items-center p-2 w-10 h-10 cursor-pointer justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100" aria-controls="navbar-sticky" aria-expanded="true">
                            <span className="sr-only">Open main menu</span>
                            {
                              Menu?
                                  <BsX size={40}/>:
                                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                                  </svg>
                            }
                          </button>
            </div>
            
        </div>
        <div className="items-center justify-between hidden w-full lg:flex lg:mb-3 lg:w-auto lg:order-1 mr-2" id="navbar-sticky">
          <ul className="flex flex-col p-4 lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
            <button id='NavbarClose' className='w-[100vw] z-[-1] h-[100vh] cursor-default fixed lg:hidden top-0 left-0' onClick={NavbarClose}></button>
            <li>
              <Link href="/" className={isActive('/')?"block py-2 pl-3 pr-4 text-gray-900 rounded lg:p-0 dark:text-white font-bold":"block py-2 pl-3 pr-4 hover:font-semibold text-gray-900 rounded lg:p-0 dark:text-white"}>Home</Link>
            </li>
            <li>
              <Link href="/deals" className={isActive('/deals')?"block py-2 pl-3 pr-4 text-gray-900 rounded lg:p-0 dark:text-white font-bold":"block py-2 pl-3 pr-4 hover:font-semibold text-gray-900 rounded lg:p-0 dark:text-white"}>Deals</Link>
            </li>           
            <li>
              <Link href="/contact" className={isActive('/contact')?"block py-2 pl-3 pr-4 text-gray-900 rounded lg:p-0 dark:text-white font-bold":"block py-2 pl-3 pr-4 hover:font-semibold text-gray-900 rounded lg:p-0 dark:text-white"}>Contact Us</Link>
            </li>
          </ul>
        </div>
        </div>
      </nav>
    </header>
    </>
  )
}

export default Header