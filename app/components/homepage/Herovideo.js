'use client'
import React, { useEffect, useState } from 'react';

const Herovideo = () => {
  const [videoState,setVideoState] = useState(false)
  useEffect(()=>{
    setTimeout(() => {
      setVideoState(true)
    }, 1000);
  })
  return (
    <>
      {
      videoState &&
      <div className="absolute left-0 w-full h-[60vh] min-h-[250px] px-1 lg:px-8 lg:pr-4 -z-50 overflow-hidden">
      <video className='bg-bg-[#1A2931]' style={{width:'100%',height:'100%',objectFit:'cover'}} autoPlay loop>
            <source src="/homepage/Herovideo.mp4" type="video/mp4" />
            </video>
        </div>
      }
    </>
  );
};

export default Herovideo;