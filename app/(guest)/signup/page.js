'use client'
import Link from 'next/link'
import React, { useState } from 'react'

import { toast } from 'react-toastify'

import {MoonLoader} from 'react-spinners'

//NEXT AUTH
import GoogleButton from 'react-google-button'
import {signIn} from 'next-auth/react'

import Image from 'next/legacy/Image'
import { Button } from '@mui/material'

//NAVIGATION
import {useRouter } from 'next/navigation'

//REACT ICONS
import {BiHide,BiShow} from 'react-icons/bi'
export default function Page() {
  const router = useRouter()
  const [data,setData] = useState({
    name:"",
    email:"name@company.com",
    password:"",
  })

  const [loading,setLoading] = useState(false)
  const [showPassword,setShowPassword]= useState(true)

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
        const {email,password,name} = data

        if(loading === false){
          if(email && password && name){
            if(isEmailValid(email) && email!='name@company.com'){
              setLoading(true)
              await signIn('credentials',{
                email,
                name,
                password,
                action:'signin',
                redirect:false
              })
              .then(res=>{
                if(res.error===null){
                  toast.success('Sign Up Successfull', {
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
                }else if(res.error==="Email Already Exist"){
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
  
  return (
    <section className='flex overflow-hidden min-h-[100vh]'>
      <div className='w-full md:w-7/12 flex justify-center items-center'>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight mytxt md:text-2xl dark:text-white text-center">
                    Create an account
                </h1>
                <form  onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div>
                        <label  htmlFor="name" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Name</label>
                        <input value={data.name} onChange={handleChange}  type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-md rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Email</label>
                        <input value={data.email} onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-md rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required autoComplete="false"/>
                    </div>
                    <div className='relative'>
                        <label htmlFor="password" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Password</label>
                        <input value={data.password} onChange={handleChange} type={showPassword?"password":'text'} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 md:text-md rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 relative" required="" />
                        <span onClick={togglePassword} className='absolute cursor-pointer bottom-3 right-3'>
                          {
                            showPassword?<BiShow size={25}/>:<BiHide size={25}/>
                          }
                        </span>
                    </div>
                    
                    <Button type="submit"  style={{width:'100%',backgroundColor:'#00442E'}} variant='contained' color='success' className="w-full">{loading ? <div className='w-full h-full flex justify-center'><MoonLoader color='white' size={20}/></div>:<span>Sign In</span>}</Button>

                    <GoogleButton onClick={()=>signIn('google')} style={{width:"100%"}}  className=' mx-auto'/>

                    <div>
                      <p className="text-md font-light text-gray-500 dark:text-gray-400">
                          Already have an Account? <Link href="/login" className="font-semibold mytxt hover:underline dark:text-blue-500">Log In</Link>
                      </p>
                      <p className="text-md font-light text-gray-500 dark:text-gray-400">
                            Don’t want to Sign up? <Link href="/" className="font-semibold text-red-600 hover:underline dark:text-red-500">Return Home</Link>
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
