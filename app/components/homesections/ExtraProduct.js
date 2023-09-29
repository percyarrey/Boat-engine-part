import React from 'react'
import Link from 'next/link'
import { Button } from '@mui/material'




/* COMPONENT */
import Homeproducts from '../homepage/Homeproducts'


export default function ExtraProduct(props) {
  
  return (
    <>
    <section>
        <h5 className="mytxt mt-4 pl-1 font-bold text-2xl">All Products</h5>
      <section className='flex px-2 justify-center'>
        <div className=' w-full grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          <Homeproducts handle ={props.handle}/>
        </div>
      </section>
      <section className='flex justify-center'>
        <Link href='/deals'  style={{maxWidth:'25rem',width:'100%',marginTop:'1rem'}}>
          <Button style={{width:'100%'}} variant='outlined' color='success'>
            <span>Show More</span>
          </Button>
        </Link>
      </section>
    </section>
    </>
  )
}
