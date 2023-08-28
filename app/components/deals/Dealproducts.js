'use client'
import React, { useEffect, useState } from 'react'
import Card from '../Card'

import {useInView} from 'react-intersection-observer'
import { fetchDealProducts } from '@/server actions/actions'

export default function Dealproducts(props) {
    const [products,setProducts]=useState(props.initialdata)
    const [page,setPage] = useState(1)
    const [ref,inView] = useInView()
    const [Npage,setNpage] = useState(true)
    useEffect(()=>{
        if(inView){
            (
                async()=>{
                    if(Npage==true){
                      const {data,npage} = await fetchDealProducts(page,props.searchParams)
                      setPage(prev=>{
                        const num = prev + 1
                        return num
                      })
                      setProducts(prev=>[
                        ...prev,
                        ...data
                      ])
                      if(npage==false){
                        setTimeout(() => {
                          setNpage(false)
                        }, 1000);
                      }
                    }
                }
            )()
        }
    },[inView])


  return (
    <>{
        products &&
        products.map((e,index)=>{
              return(
                <div key={index} className='w-full  flex justify-center' style={{height:'405.6px'}}>
                  <Card data={e}/>
                </div>
              )
        })
      }
      {
        Npage ? 
        <>
         <div ref={ref} style={{display:'flex',minHeight:'10rem',justifyContent:'center',alignItems:'center',width:'100%'}} >
            {/* <ClipLoader size={100} color='blue'/> */}{/* Loading */}
              <div className='h-8 w-8 inline-block rounded-full border-4 border-r-gray-800 border-solid animate-spin' role='status'>
              </div>
          </div>
        </>:
        <>
          {
            products.length ===0 && 
            <>
              <div className='w-[100vw]' style={{display:'flex',minHeight:'15rem',justifyContent:'center',alignItems:'center'}} >
                {/* <ClipLoader size={100} color='blue'/> */}{/* Loading */}
                  <div className=' text-xl text-red-600 font-semibold' role='status'>
                    No Product Found
                  </div>
              </div>
            </>
          }
        </>
      }
    </>
  )
}
