import { Button } from '@mui/material'
import Image from 'next/legacy/Image'
import Link from 'next/link'
import React from 'react'

export default function Trending() {
  return (
    <div className='flex mt-2 gap-1 sm:gap-6 justify-between px-3'>
        <div className='bg-[#e8ededba] w-full sm:w-6/12 rounded-xl shadow-md overflow-hidden'>
            <Link href={'/deals'}>  
                <div className='relative bg-[#e8eded] h-[8rem]  md:h-[16rem]'>
                            <Image  src="/homepage/trend1.jpeg" alt="hello" layout='fill' objectFit='contain' objectPosition={'center'}/>
                </div>                
                <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Furniture Village</h5>
                        <p >Delivery with in 24 hours</p>
                        <div className='flex justify-center'>
                            <Button  style={{maxWidth:'16rem',width:'100%',backgroundColor:'#066E4C'}} variant='contained' color='success'>
                                Shop Now
                            </Button>
                        </div>
                </div>
            </Link>   
        </div>
        <div className='bg-[#e8ededb4] w-full sm:w-6/12 rounded-xl shadow-md overflow-hidden'>
            <Link href={'/deals'}>  
                <div className='relative bg-[#e8eded] h-[8rem]   md:h-[16rem]'>
                            <Image src="/homepage/trend2.jpeg" alt="hello" layout='fill' objectFit='contain' objectPosition={'center'}/>
                </div>
                <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Furniture Village</h5>
                        <p >Delivery with in 24 hours</p>
                        <div className='flex justify-center'>
                            <Button  style={{maxWidth:'16rem',width:'100%',backgroundColor:'#066E4C'}} variant='contained' color='success'>
                                Shop Now
                            </Button>
                        </div>
                </div>
            </Link>   
        </div>
    </div>
    
  )
}
