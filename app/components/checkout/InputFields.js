'use client'
import { Button } from '@mui/material'
import React, {useState} from 'react'
import {useRouter} from 'next/navigation'
export default function InputFields() {
  const router = useRouter()
  const [data,setdata]=React.useState({
      fname:"",
      num:"",
      pin:"",
      house:"",
      area:"",
      land:"",
      town:"",
      state:""
  })
  //HANDLE CHANGE
  const handleChange=(e)=>{
    const{name,value}=e.target
    setdata((prev)=>{
      return{
          ...prev,
          [name]:value
      }
    })
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    router.push('/checkout')
  }
  return (
    <div className='pb-6 w-full  max-w-[45rem]  pt-1'>
      <h2 className='mytxt text-center'>Enter Your Address</h2>
      <form onSubmit={handleSubmit}>
          <div className="grid gap-2 mb-2 ">
            
            {/*NAME */}
              <div>
                  <input name='fname' type="text" value={data.fname} onChange={handleChange} id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Full name"/>
              </div>
            {/*Mobile Number */}
            <div>
                  <input name='num' type='text' value={data.num} onChange={handleChange} id="num" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mobile Number"/>
              </div>
            {/*PIN code */}
            <div>
                  <input name='pin' type='text' value={data.pin} onChange={handleChange} id="pin" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="PIN Code"/>
            </div>
            {/* Flat House */}
            <div>
                  <input name='house' type='text' value={data.house} onChange={handleChange} id="house" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flat, House no.. Building, Company, Apartment"/>
              </div>
            {/*Area */}
            <div>
                  <input name='area' type='text' value={data.area} onChange={handleChange} id="area" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Area, Colony, Street, Sector, Village"/>
              </div>
              {/*Land*/}
              <div>
                      <input name='land' type='text' value={data.land} onChange={handleChange} id="land" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Landmark e.g near Susan Hospital"/>
                </div>
              {/*Land*/}
              <div>
                      <input name='town' type='text' value={data.town} onChange={handleChange} id="town" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="City/Town"/>
                </div>
                {/*State*/}
                <div>
                      <input name='state' type='text' value={data.state} onChange={handleChange} id="state" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter state"/>
                </div>
          </div>
        <div className=' pt-1 flex justify-center'>
          <Button type={'submit'}  style={{width:'100%',textTransform:'none',maxWidth:'20rem',backgroundColor:'#ED6C02'}} variant='contained' color='warning'>
              Proceed to Checkout
          </Button>
        </div>
      </form>

    </div>
  )
}
