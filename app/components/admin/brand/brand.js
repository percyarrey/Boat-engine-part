'use client'
import React, {useState} from 'react'
import Brandcomp from './brandcomp'
import axios from 'axios';

import { useRouter } from 'next/navigation'


import { toast } from 'react-toastify';


export default function Brand(props) {
  //NAVIGATION
  const router = useRouter()

  const [name, setname] = useState('');
  const handleInputChange = (e) => {
    setname(e.target.value);
  };

  const handleSubmit =async(e)=>{
    e.preventDefault()
    if(name){
      var data={name:name}
      await axios.post('/api/crudbrand',data)
        .then(res=>{
          res=res.data
          if(res.message===1){
            toast.success('Brand Added Successfully', {
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
                router.refresh()
            }, 1990);
          }else if(res.message===0){
            toast.warn('Brand already Exist', {
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
            toast.warn('Failed to add Brand', {
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
      toast.warn('Enter a brand', {
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
  }
  return (
    <div className='flex px-2 justify-center'>
       <div className='w-full max-w-[30rem]'>
       <h1 className="text-lg text-center font-semibold mb-4 pt-1">Manage Brand</h1>
       <form onSubmit={handleSubmit}>
        <div className="flex items-center">
        <input
            type="text"
            value={name}
            onChange={handleInputChange}
            placeholder="Enter an item"
            className="border w-full border-gray-300 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
            type='submit'
            className="bg-[#1A5843] text-white px-4 py-2 rounded-r-md hover:bg-[#1f674f] focus:outline-none focus:ring-2 focus:ring-[#24765b]"
        >
            Add
        </button>
        </div>
       </form>
       <div className='text-center'> 
        <small  className='text-yellow-400 mt-1 text-center'>Warning</small>:<small className='text-red-600 mt-1 text-center'> Deleting a brand will delete all {"it's"} products</small>
       </div>
       <hr className='my-2'/>
       <div className='mt-2'>
            {
                props.data &&
                props.data.map((e,index)=>{
                    return <Brandcomp data={e} key={index}/>
                })
            }
       </div>
       </div>
    </div>
  )
}
