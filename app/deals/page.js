import { Button } from '@mui/material'
import React from 'react'
import Category from '../components/deals/Category'
import getDealProduct from '@/services/getDealProducts'
import Dealproducts from '../components/deals/Dealproducts'
import { v4 as uuidv4 } from 'uuid'
export default async function page({searchParams}) {
  const {data} = await getDealProduct(0,searchParams)
  const uuid = uuidv4()
  return (
    <>
      <section  key={uuid}>
        <Category searchParams={searchParams}/>
      </section>
      <section className='flex px-2 justify-center'>
        <div key={uuid} className=' w-full grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          <Dealproducts initialdata={data} searchParams={searchParams}/>
        </div>
      </section>
    </>
  )
}
