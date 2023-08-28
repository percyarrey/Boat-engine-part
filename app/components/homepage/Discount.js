'use client'
import React from 'react'
import { Button } from '@mui/material'
import {useRouter} from 'next/navigation'
export default function Discount() {
  const router = useRouter()
  return (
    <div className='flex scale-image justify-end items-center  min-h-[50vh] overflow-hidden sm:px-[1rem] lg:px-[7rem] scale-image lg:h-[50vh] text-white'>
          <div className='mybg p-6  max-w-[368px] z-10'>
              <h6 className='text-2xl font-bold'>Get 5% Cash Back On $200</h6>
              <p>Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.</p>
              <Button  onClick={()=>{router.push('/deals')}} style={{color:'white',borderRadius:'9999px',border:'1px solid white',marginTop:'1rem'}} variant='outlined'>
                Shop Now
              </Button>
        </div>
      </div>
  )
}
