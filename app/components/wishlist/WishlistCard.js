'use client'
import React from 'react'
import Image from 'next/legacy/Image'
import { Button } from '@mui/material'
import Wishlistbtn from '../deals/wishlistbtn'
import { BsDot, BsStarFill, BsStarHalf } from 'react-icons/bs'

import {useRouter} from 'next/navigation'
export default function WishlistCard(props) {
  const data= props.data
  //NAVIGATION
  const router = useRouter()
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
    //HANDLE CLICK
    const handleClick =(e)=>{
      if(e.target.closest('[name="actions"]')){
      }else{
          router.push(`/deals/${data._id}`)
      }
  }
  return (
    <div className='min-h-[9rem] max-w-[45rem] w-full flex rounded-md shadow-sm overflow-hidden gap-3 myCard' onClick={handleClick}>
        <div className='w-5/12 md:w-3/12  h-[9rem] relative bg-black'>
            <Image alt='' layout='fill' objectFit='cover' src={data.image.img1}/>
        </div>
        <div className=' flex-1 h-full'>
          {/* DETAILS */}
      <div className='flex flex-col '>
        {/* HEAD */}
        <h2 style={{fontFamily:'Helvetica, sans-serif,Arial'}} className='font-semibold text-lg'>{controlLength(data.productname,22)}</h2>
        <h2 className='font-meduim text-opacity-70 text-base flex items-center gap-x-1  text-gray-900 dark:text-gray-400'>{data.brand} <b><BsDot/></b> {data.year}</h2>
        <p className="mt-1 text-opacity-70 font-semibold text-base text-gray-900 dark:text-gray-400">1 x {data.hp} hp / {Math.ceil(data.hp *0.746)} kW</p>
        <div className='flex'>{ControlRating(data.rating)}</div>
        <div name='actions' className='mt-1 flex gap-2 sm:gap-9'>
          <Wishlistbtn data={data}/>
        </div>
      </div>
        </div>
    </div>
  )
}
