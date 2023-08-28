
import Thumbnails from '@/app/components/deals/Thumbnails';
import Wishlistbtn from '@/app/components/deals/wishlistbtn';
import { getDealDetails } from '@/services/getDealDetails';
import { Button } from '@mui/material';
import { redirect } from 'next/navigation';
import React from 'react'
import { BsDot, BsStarFill, BsStarHalf } from 'react-icons/bs';
export default async function page({params}) {
  var data = await getDealDetails(params.id)

  
  if(!data){
    redirect('/deals')
  }
  //CONTROL RATING
  const Stars = (num)=>{
        return Array(num).fill(<BsStarFill color="#0AAC0C" />)
    };
    const ControlRating=(num)=>{
        if(num===4.5){
            return Stars(5).map((star,index)=>{
                if(index===4){
                    return (
                            <span key={index}><BsStarHalf color="#0AAC0C" /></span>
                    )
                }else{
                    return (
                            <span key={index}>{star}</span>
                    )
                }
                
            })
        }else{
            return (Stars(num).map((star,index)=>{
                return (
                        <span key={index}>{star}</span>
                )
            }))
        }
    }
  return (
    <div className='grid gap-3 pt-3 md:grid-cols-2'>
      {/* THUMBNAILS */}
      <div>
        <Thumbnails data = {data}/>
      </div>
      {/* DETAILS */}
      <div className='flex flex-col gap-1 pl-6 md:pl-0 pb-7 md:pb-0 pr-6'>
        {/* HEAD */}
        <h2 style={{fontFamily:'Helvetica, sans-serif,Arial'}} className='font-bold text-xl'>{data.productname}</h2>
        <h2 className='font-semibold text-opacity-70 text-base flex items-center gap-x-1  text-gray-900 dark:text-gray-400'>{data.brand} <b><BsDot/></b> {data.year}</h2>
        <div className=' text-sm min-h-[1.1rem]' style={{color:'#504C4C'}}>{data.description} </div>
        <p className="mt-1 text-opacity-70 font-semibold text-base text-gray-900 dark:text-gray-400">1 x {data.hp} hp / {Math.ceil(data.hp *0.746)} kW</p>
        <div className='flex mb-3'>{ControlRating(data.rating)}</div>
        {/* BODY */}
        <hr></hr>
        <div className=' font-bold text-lg'>
          ${data.price} <br/>
          <small className=' font-normal' style={{color:'#504C4C'}}>Free delivery on payment</small>
        </div>
        <hr></hr>
        <div className='mt-1 flex gap-9 mb-6'>
          <Wishlistbtn data={data}/>
        </div>
      </div>
    </div>
  )
}
