'use client'
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation'

export default function Page() {
  const [data,setdata]=useState('')

  //NAVIGATION
  const router = useRouter()

  const handleInputChange = (e) => {
    setdata(e.target.value);
  };
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(data){
      axios.get(`/api/crudorder?id=${data}`)
      .then(res=>{
        res=res.data
        if(res.message===1){
          router.push(`/trackorder/${res.id}`)
        }else{
          toast.warn('No Order Found ! Check the Id', {
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
      })
      .catch(e=>{
        console.log(e)
        toast.warn('Something went wrong !Try again', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      })
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
  return (
    <div className='flex px-2 justify-center min-h-[50vh]'>
       <div className='w-full max-w-[30rem] mt-12'>
       <form onSubmit={handleSubmit}>
        <div className="flex items-center">
        <input
            type="text"
            value={data}
            onChange={handleInputChange}
            placeholder="Enter an order ID"
            className="border w-full border-gray-300 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
            type='submit'
            className="bg-[#1A5843] text-white px-4 py-2 rounded-r-md hover:bg-[#1f674f] focus:outline-none focus:ring-2 focus:ring-[#24765b]"
        >
            <nobr>Track Order</nobr>
        </button>
        </div>
       </form>
       </div>
    </div>
  )
}
