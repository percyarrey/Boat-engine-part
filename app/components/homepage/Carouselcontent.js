import React from 'react'
import Herocard from './Herocard'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
export default function Carouselcontent(props) {
  const router = useRouter()
  return (
    <>
        <div className={"flex flex-wrap px-[0.5rem] sm:px-[2rem] lg:px-[8rem] items-center cursor-grab pt-3 sm:pt-0 h-full  min-h-[55vh] "+props.color}>
          <div className=" w-8/12 lg:w-6/12 sm:w-8/12 md:w-6/12 lg:8/12 gap-[1rem]   md:gap-[2rem] justify-center flex flex-col">
            <div> 
              <div className=" text-xl sm:text-3xl lg:text-4xl flex gap-1 flex-col text-white font-[600]">
                <p>Renovate {"Your's"} <b>Boat</b> with A New Durable Engine</p>
              </div>
              <span className="text-white text-sm sm:text-lg">Grab Up to <b style={{color:props.btn}}>{props.discount}%</b> Off, On This Engine</span>
            </div>
            <div>
              <Button onClick={()=>{router.push('/checkout/'+props.data._id)}} variant="contained" style={{backgroundColor:props.btn,borderRadius:'9999px',padding:'0.6rem',paddingLeft:'3rem',paddingRight:'3rem'}}>
                Buy Now
              </Button>
            </div>
          </div>
          <Herocard id={props.data._id} productname={props.data.productname} image={props.data?.image?.img1} class={"flex-1 flex justify-center lg:justify-end lg:pr-9"} price={props.data.price} color ={props.btn} discount={props.discount}/>
        </div>
    </>
  )
}
