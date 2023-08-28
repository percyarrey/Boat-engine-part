import { getDealDetails } from '@/services/getDealDetails'
import React from 'react'
import {redirect} from 'next/navigation'
import InputFields from '@/app/components/checkout/InputFields'
import { BsDot, BsStarFill, BsStarHalf } from 'react-icons/bs';
import Image from 'next/legacy/Image'
export default async function Page({params}) {
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
      //CONTROL LENGTH
      const controlLength=(txt,len)=>{
          
        if(txt.length>len){
            txt = txt.slice(0,len) + "..."
            return txt
        }
        return txt + ' .'
      } 
  var data = await getDealDetails(params.id)
  if(!data){
    redirect('/deals')
  }
  return (
   <div>
    <div className='flex justify-center'>
    <div className='min-h-[9.5rem] max-w-[45rem] w-full flex flex-wrap rounded-md shadow-sm overflow-hidden gap-3 myCard'>
        <h2 className='mytxt w-full font-medium'>Summary</h2>
        <div className='w-5/12 md:w-3/12  h-[9.5rem] relative bg-black'>
            <Image alt='' layout='fill' objectFit='cover' src={data.image.img1}/>
            </div>
            <div className=' flex-1 h-full'>
              {/* DETAILS */}
          <div className='flex flex-col '>
            {/* HEAD */}
            <h2 style={{fontFamily:'Helvetica, sans-serif,Arial',opacity:0.75,}} className='font-semibold text-lg'>{controlLength(data.productname,20)}</h2>
            <div className='flex justify-between pr-12' style={{color:'#6D6D6D'}}>
              <div>item:</div>
              <div>${data.price}</div>
            </div>
            <div className='flex justify-between pr-12' style={{color:'#6D6D6D'}}>
              <div>Delivery:</div>
              <div>$0:00</div>
            </div>
            <div  style={{fontFamily:'Helvetica, sans-serif,Arial'}} className='font-semibold text-lg flex justify-between pr-12'>
              <div>Order Total:</div>
              <div>${data.price}</div>
            </div>
            <div  style={{fontFamily:'Helvetica, sans-serif,Arial'}} className='font-semibold text-sm text-sky-600 underline flex justify-between pr-12'>
            <div>Delivery in 2 day</div>
            </div>
          </div>
            </div>
        </div>
    </div>

    <div className='flex justify-center'>
      <InputFields data={data}/>
    </div>
   </div>
  )
}
