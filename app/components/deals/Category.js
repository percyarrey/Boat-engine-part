'use client'

import { Button } from "@mui/material";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import { FiChevronRight,FiChevronLeft} from 'react-icons/fi'
import { useRef, useState } from "react";

import{ useSearchParams,useRouter,usePathname} from 'next/navigation';

import { useCallback } from 'react';
export default function Category(props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  //SEARCH FUNCTIONALITY
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )
  const sliderRef = useRef(null)
    /* BRAND */
  const handleChange = (e) =>{
    if(e.target.value!=e.target.name){
      console.log(props.searchParams.Sortby !=undefined)
      if(props.searchParams.Sortby !=undefined && e.target.name != 'Sortby'){
        router.push('/deals/')
      }
      router.push(pathname +'?'+ createQueryString(e.target.name,e.target.value))
    }
  }

  const handleSlideLeft =(e)=>{
    if(sliderRef!=undefined && sliderRef.current!=undefined && sliderRef.current!=null){
        sliderRef.current.slidePrev()
    }
  }
  const handleSlideRight =(e)=>{
    if(sliderRef!=undefined && sliderRef.current!=undefined && sliderRef.current!=null){
    console.log(sliderRef.current.slideNext())

        sliderRef.current.slideNext(1000)
    }
  }
  function handleSwiper(swiper){
    sliderRef.current = swiper
  }
  return (
    <div className="relative max-h-[95vw] overflow-hidden">
    <div className="swiper-container relative pl-[1.8rem] lg:pl-0">
      <div className="w-0 lg:hidden absolute left-0 z-10 h-[3rem]">
        <button id="-1" onClick={handleSlideLeft} className='swiper-button-prev border-r-[#ffffff3e] bg-white h-full bg-opacity-[0.95]'>
          <FiChevronLeft id="-1" size={30}/>
        </button>
      </div>
      <Swiper
        onSwiper={handleSwiper}
        style={{paddingTop:'0.4rem',paddingBottom:'0.4rem'}}
        slidesPerView="2"
        spaceBetween={5}
        breakpoints={{
          413:{
            slidesPerView:'3.3'
          },
          500:{
            slidesPerView:'4'
          }
        }}
        navigation={{
          nextEl:'#swiper-button-next',
          prevEl:'.swiper-button-prev'
        }}
        className="mySwiper fade-edge-swiper"
 
      >
        <SwiperSlide  style={{maxWidth:'5.5rem',minWidth:'5.5rem'}}>
          {/* All Filter */}
          <div>
            <Button onClick={()=>{router.push(pathname)}} style={{backgroundColor:'#EBEDED',color:'black',borderRadius:'9999px',textTransform:'none',paddingRight:'1rem',paddingLeft:'1rem'}}>All Filter</Button>
          </div>
        </SwiperSlide>
        {/* Sort By */}
        <SwiperSlide style={{maxWidth:'8.1rem',minWidth:'8.1rem'}}>
          <div>
            <select value={props.searchParams.Sortby} name="Sortby" onChange={handleChange} className="block h-9 bg-[#EBEDED]  w-[7rem] p-2 mb-6 text-sm text-gray-900 border border-gray-300bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-full pl-4 placeholder:bg-slate-800" >
              <option value={'Sortby'} >Sort By</option>
              <option value="brand">Brand</option>
              <option value="hp">Performance</option>
              <option value="rating">Rating</option>
              <option value="price">Price</option>
            </select>
          </div>
        </SwiperSlide>
        {/* BRAND*/}
        <SwiperSlide style={{maxWidth:'8.1rem',minWidth:'8.1rem'}}>
          <div className=" flex justify-center">
          <select value={props.searchParams.brand} onChange={handleChange} name="brand" className="block h-9 bg-[#EBEDED] w-[8rem] p-2 mb-6 text-sm text-gray-900 border border-gray-300bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-full pl-4" >
              <option value={'brand'}>Brand</option>
              <option value="TOHATSU">TOHATSU</option>
              <option value="SUZUKI">SUZUKI</option>
              <option value="YAMAHA">YAMAHA</option>
              <option value="MERCURY">MERCURY</option>
              <option value="OTHERS">OTHERS</option>
          </select>
        </div>
        </SwiperSlide>
        {/* Performance */}
        <SwiperSlide  style={{maxWidth:'9.1rem',minWidth:'9.1rem'}}>
        <div className=" flex justify-center">
          <select value={props.searchParams.hp} name="hp" onChange={handleChange} className="block h-9 bg-[#EBEDED]  w-[9rem] p-2 mb-6 text-sm text-gray-900 border border-gray-300bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-full pl-4 placeholder:bg-slate-800" >
            <option value={'hp'} >Performance</option>
            <option value={100} >Less than 100kw</option>
            <option value={200}>Less than 200kw</option>
            <option value={300}>Less than 300kw</option>
            <option value={400}>Less than 400kw</option>
            <option value={500}>Less than 500kw</option>
            <option value={600}>Less than 600kw</option>
          </select>
        </div>
        </SwiperSlide>
          {/* Rating */}
        <SwiperSlide  style={{maxWidth:'6.1rem',minWidth:'6.1rem'}}>
        <div className=" flex">
          <select name="Rating" value={props.searchParams.Rating} onChange={handleChange} className="block h-9 bg-[#EBEDED]  w-[6rem] p-2 mb-6 text-sm text-gray-900 border border-gray-300bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-full pl-4" >
            <option value="Rating">Rating</option>
            <option value="1">1 star</option>
            <option value="2">2 star</option>
            <option value="3">3 star</option>
            <option value="4">4 star</option>
            <option value="4.5">4.5 star</option>
            <option value="5">5 star</option>
          </select>
        </div>
        </SwiperSlide>
         {/* Price */}
         <SwiperSlide  style={{maxWidth:'9.3rem',minWidth:'9.3rem'}}>
        <div className=" flex">
          <select value={props.searchParams.Price} name="Price" onChange={handleChange} className="block h-9 bg-[#EBEDED]  w-[9.2rem] p-2 mb-6 text-sm text-gray-900 border border-gray-300bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-full pl-4" >
            <option value={'Price'}>Price</option>
            <option value={10}>Less than 10 $</option>
            <option value={20}>Less than 20 $</option>
            <option value={30}>Less than 30 $</option>
            <option value={40}>Less than 40 $</option>
            <option value={50}>Less than 50 $</option>
          </select>
        </div>
        </SwiperSlide>
      </Swiper>
      <div className="w-0 lg:hidden z-10 h-[3rem] absolute left-[89vw] top-0">
        <button  id="swiper-button-next" onClick={handleSlideRight} className=' border-r-[12rem] border-r-white border-l-[#ffffff3e] bg-white h-full bg-opacity-[0.95]'>
          <FiChevronRight id="-1" size={30}/>
        </button>
      </div>
    </div>
    </div>
  );
}