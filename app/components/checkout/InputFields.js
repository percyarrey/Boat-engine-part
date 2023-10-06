'use client'
import { Button } from '@mui/material'
import React, {useState,useEffect} from 'react'
import {useRouter} from 'next/navigation'
import CountrySelector from '../Countries/selector';
import { COUNTRIES } from "../Countries/countries";

//NEXT AUTH
import { MoonLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function InputFields(props) {
  //REACT HOOK DECLARATION
  const [loading,setLoading]=React.useState(false)
  
  //SESSION
  const user = props.user


  const router = useRouter()
  const [data,setdata]=React.useState({
      fname:user.name,
      email:user.email,
      country:"",
      num:"",
      pin:"",
      house:"",
      area:"",
      land:"",
      town:"",
      state:"",
      price:props.data.price
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

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const {fname,email,num,pin,house,area,land,town,state,productId,userId,price}=data
    e.preventDefault();
    if(loading === false){
      if(fname&&email&&num&&pin&&house&&area&&land&&town&&state){
        console.log(userId)
        setLoading(true)
        data.country=country
        data.productId=props.data._id
        data.userId=user?.id
        await axios.post('/api/crudorder',data)
        .then(res=>{
          res=res.data
          if(res.res){
            router.push(`/trackorder/${res.id}`)
          }else{
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


  //SELECTOR
  const [isOpen, setIsOpen] = useState(false);
  // Default this to a country's code to preselect it
  const [country, setCountry] = useState("United States");

  return (
    <div className='pb-6 w-full  max-w-[45rem]  pt-1'>
      <h2 className='mytxt text-center mt-4 opacity-80'>Fill the <b>Required</b> Information</h2>
      <form onSubmit={handleSubmit}>
          <div className="grid gap-2 mb-2 ">
            {/*NAME */}
              <div className='mt-2'>
              <label htmlFor='fname' className="block mb-2 text-sm font-medium text-gray-700">
                      Enter client details  
                    </label>
                  <input name='fname' type="text" value={data.fname} onChange={handleChange} id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Full name"/>
              </div>
              {/*Email*/}
              <div>
                  <input name='email' type="email" value={data.email} onChange={handleChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email address"/>
              </div>
            {/*Mobile Number */}
            <div>
                  <input name='num' type='text' value={data.num} onChange={handleChange} id="num" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mobile Number"/>
            </div>
            {/* COUNTRY */}
            <div className='mt-6'>
            <div
                  className={"w-full"}
                >
                  <div>
                    <label className="block text-sm mb-2 font-medium text-gray-700">
                      Enter your address
                    </label>
                    <CountrySelector
                      id={"country-selector"}
                      open={isOpen}
                      onToggle={() => setIsOpen(!isOpen)}
                      onChange={setCountry}
                      selectedValue={COUNTRIES.find((option) => option.title === country)}
                    />
                  </div>
                </div>
            </div>
            {/*State*/}
            <div>
                      <input name='state' type='text' value={data.state} onChange={handleChange} id="state" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter state or province"/>
            </div>
            {/*TOWN*/}
            <div>
                      <input name='town' type='text' value={data.town} onChange={handleChange} id="town" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="City/Town"/>
                </div>
                {/*Area */}
            <div>
                  <input name='area' type='text' value={data.area} onChange={handleChange} id="area" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Area, Colony, Street, Sector, Village"/>
              </div>
            
            {/* Flat House */}
            <div>
                  <input name='house' type='text' value={data.house} onChange={handleChange} id="house" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flat, House no.. Building, Company, Apartment"/>
              </div>
            
              {/*Land*/}
              <div>
                      <input name='land' type='text' value={data.land} onChange={handleChange} id="land" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Landmark e.g near Susan Hospital"/>
                </div>
              
               {/*PIN code */}
            <div>
                  <input name='pin' type='text' value={data.pin} onChange={handleChange} id="pin" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="PIN Code"/>
            </div> 
          </div>
        <div className=' pt-1 flex justify-center'>
          <Button type={'submit'}  style={{width:'100%',textTransform:'none',maxWidth:'20rem',backgroundColor:'#ED6C02'}} variant='contained' color='warning'>
              {loading ? <div className='w-ful h-full flex justify-center'><MoonLoader color='white' size={20}/></div>:<span>Proceed to Checkout</span>}
          </Button>
        </div>
      </form>

    </div>
  )
}
