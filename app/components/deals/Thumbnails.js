'use client'
import Image from 'next/legacy/Image'
import React, { useState } from 'react'

export default function Thumbnails(props) {
    const data = props.data

    const [Thumb,setThumb] = useState(data.image.img1)
    const handleThumbnail = (e)=>{
        setThumb(e.target.src)

    }
    return (
    <div  className=' px-6'>
          <div className='relative  rounded-lg h-[50vh] md:h-[55vh] bg-slate-200  w-full'>
            <Image src={Thumb} layout='fill' alt='cart image' objectFit='contain'/>
          </div>
          <div className='grid gap-6 grid-cols-4 py-3'>
          {
              data.image.img1 &&
              <div className={Thumb==data.image.img1 ? 'relative cursor-pointer rounded-md p-2 h-[4.4rem] bg-slate-200 border-[0.1rem] border-sky-600 shadow-md' : 'relative cursor-pointer rounded-md p-2 h-[4.4rem] bg-slate-200'}>
                <Image onClick={handleThumbnail} src={data.image.img1} layout='fill' alt='cart image' objectFit='cover'/>
              </div>
            }
            {
              data.image.img2 &&
              <div className={Thumb==data.image.img2 ? 'relative cursor-pointer rounded-md p-2 h-[4.4rem] bg-slate-200 border-[0.1rem] border-sky-600 shadow-md' : 'relative cursor-pointer rounded-md p-2 h-[4.4rem] bg-slate-200'}>
                <Image  onClick={handleThumbnail} src={data.image.img2} layout='fill' alt='cart image' objectFit='cover'/>
              </div>
            }
            {
              data.image.img3 &&
              <div className={Thumb==data.image.img3 ? 'relative cursor-pointer rounded-md p-2 h-[4.4rem] bg-slate-200 border-[0.1rem] border-sky-600 shadow-md' : 'relative cursor-pointer rounded-md p-2 h-[4.4rem] bg-slate-200'}>
                <Image onClick={handleThumbnail} src={data.image.img3} layout='fill' alt='cart image' objectFit='cover'/>
              </div>
            }
            {
              data.image.img4 &&
              <div className={Thumb==data.image.img4 ? 'relative cursor-pointer rounded-md p-2 h-[4.4rem] bg-slate-200 border-[0.1rem] border-sky-600 shadow-md' : 'relative cursor-pointer rounded-md p-2 h-[4.4rem] bg-slate-200'}>
                <Image onClick={handleThumbnail} src={data.image.img4} layout='fill' alt='cart image' objectFit='cover'/>
              </div>
            }
          </div>
        </div>
  )
}
