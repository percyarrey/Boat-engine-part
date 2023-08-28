'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'


import { toast } from 'react-toastify'

import { MoonLoader} from 'react-spinners'


import { useRouter } from 'next/navigation'
import Image from 'next/legacy/Image'
import { Button } from '@mui/material'

//NEXT AUTH
import GoogleButton from 'react-google-button'
import {signIn} from 'next-auth/react'

//REACT ICONS
import {BiHide,BiShow} from 'react-icons/bi'

export default function Page() {
  const router = useRouter()

  const [data,setData] = useState({
    email:"name@company.com",
    password:"",
  })

  const [showPassword,setShowPassword]= useState(true)

  const [loading,setLoading] = useState(false)
  //HANDLE CHANGE
  function handleChange(e){
    const {name,value} = e.target
    setData((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  function togglePassword(e){
    setShowPassword(prev=>!prev)
  }
  //HANDLE SUBMINT
  function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  async function handleSubmit(e){
    e.preventDefault();
    const {email,password} = data

    if(loading === false){
      if(email && password){
          if(isEmailValid(email) && email!='name@company.com'){
            setLoading(true)
            await signIn('credentials',{
              email,
              password,
              action:'login',
              redirect:false
            })
            .then(res=>{
              console.log(res)
              if(res.error===null){
                toast.success('Login Successfull', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                setTimeout(() => {
                  router.replace('/')
                }, 1500);
              }else if(res.error==="Wrong Username and Password"){
                toast.warn(res.error, {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  });
              }else{
                console.log(res.error)
                toast.error('Something went wrong !Try Again', {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }
              setLoading(false)
            })
            .catch(error=>{
                toast.error('Something went wrong !Try Again', {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              setLoading(false)
            })
          }else{
            toast.warn('Enter a valid email', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
              });
          }
          }else{
        toast.warn('Please fill required Information', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          });
      }
      }
  }
  async function handleGoogle(e){
    await signIn('google',{redirect:false , callbackUrl: `${window.location.origin}/`})
  }
  return (
    <section className='flex overflow-hidden min-h-[95vh]'>
      <div className='w-full md:w-7/12 flex justify-center items-center'>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight mytxt md:text-2xl dark:text-white text-center">
                  Log in to your account
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Your email</label>
                        <input value={data.email} onChange={handleChange} autoComplete='off' type='email' name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-md rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"/>
                    </div>
                    <div className='relative'>
                        <label htmlFor="password" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Password</label>
                        <input value={data.password} autoComplete='off' onChange={handleChange} type={showPassword?"password":'text'} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 md:text-md rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative"/>
                        <span onClick={togglePassword} className='absolute cursor-pointer bottom-3 right-3'>
                          {
                            showPassword?<BiShow size={25}/>:<BiHide size={25}/>
                          }
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 cursor-pointer mt-2"/>
                            </div>
                            <div className="ml-3 text-md">
                              <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <a href="#" className="text-md font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
                    </div>
                    <Button type="submit"  style={{width:'100%',backgroundColor:'#00442E'}} variant='contained' color='success' className="w-full">{loading ? <div className='w-ful h-full flex justify-center'><MoonLoader color='white' size={20}/></div>:<span>Log In</span>}</Button>

                    
                     <GoogleButton onClick={handleGoogle} style={{width:"100%"}} className=' mx-auto ' />

                    
                    <div>
                        <p className="text-md font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <Link href="/signup" className="font-semibold mytxt hover:underline dark:text-blue-500">Sign up</Link>
                        </p>
                        <p className="text-md font-light text-gray-500 dark:text-gray-400">
                            Don’t want to Login? <Link href="/" className="font-semibold text-red-600 hover:underline dark:text-red-500">Return Home</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
      </div>
      <div className='md:flex-1 hidden md:flex justify-center items-center'>
      <div className=' relative h-full w-full'>
            <Image layout='fill' objectFit='contain'  src='/homepage/discount.jpg' alt='sign in image'/>
        </div>
      </div>
    </section>
  )
}
