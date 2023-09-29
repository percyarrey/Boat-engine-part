'use client'
import React, { useEffect, useState } from 'react'
import Card from '../Card'

import { fetchProducts } from '../../../server actions/actions'

export default function Homeproducts(props) {
    const [products,setProducts]=useState()
    useEffect(()=>{
            (
                async()=>{
                    const data = await fetchProducts(11)
                    setProducts(data)
                    props.handle()
                }
            )()
    },[])
  return (
    <>{
        !products?
        <div style={{display:'flex',minHeight:'5rem',justifyContent:'center',alignItems:'center',width:'100%'}} >
            <div className='h-8 w-8 inline-block rounded-full border-4 border-r-gray-800 border-solid animate-spin' role='status'>
            </div>
        </div>
    :
        products.map((e,index)=>{
            if(index<8){
              return(
                <div key={index} className='w-full  flex justify-center' style={{height:'405.6px'}}>
                  <Card data={e}/>
                </div>
              )
            }
        })
      }
    </>
  )
}
