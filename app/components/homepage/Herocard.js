'use client'
import React from 'react'

import Image from "next/legacy/Image";
import { useRouter } from 'next/navigation';
function Herocard(props) {
  const router = useRouter() 
  //CONTROL LENGTH
  const controlLength=(txt,len)=>{
    if(txt.length>len){
        txt = txt.slice(0,len) + "..."
        }
        return txt
    }  
    //CONTROL PRICE
    var price = props.price
    var priceInt = Math.floor(price)
    var priceDec = price % 1
    priceDec = priceDec.toString()
    priceDec = priceDec.slice(1,4)
  function handleClick() {
    router.push('/deals/'+props.id)
  }
  return (
    <div  className={props.class}>
        <div className="h-full flex overflow-hidden  flex-col items-center justify-center min-h-[12rem] sm:min-h-[15rem] bg-[#FFFFFF] myCard w-full rounded-3xl" onClick={handleClick} style={{maxWidth:"15rem",maxHeight:"16rem",cursor:"pointer"}}>
            <div className='pt-2 px-1 w-full md:w-[80%]'>
                <div className='h-full w-full'>
                  <div className='flex justify-end w-full h-0 items-start'>
                  <div className=' rounded-full bg-[#D32F2F] z-20 p-1 shadow-sm font-semibold text-white'>
                    -{props.discount}
                  </div>
                </div>

                <div className='relative min-h-[10rem] justify-center sm:min-h-[12rem]'>
                  <Image title={props.productname} src={props.image} alt={'Boat engine image'} layout='fill' objectFit='cover'/>
                </div>
                
            </div>
            </div>
            <div className="flex items-center">
                <div className=' text-lg text-center w-full' style={{color:props.color}}>
                <div style={{fontFamily:'Helvetica, sans-serif,Arial'}} className={'font-bold '}>
                    <span className='text-xs absolute'>$</span>
                    <span className='ps-2'>
                        {priceInt}
                    </span>
                    <span className='text-xs absolute'>{priceDec}</span>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Herocard