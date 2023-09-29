import Editproduct from '../../../components/admin/Editproduct'
import { getDealDetails } from '../../../../services/getDealDetails'
import React from 'react'
import { redirect } from 'next/navigation'
import getBrand from '../../../../services/getBrand'
export default async function page({params}) {
  
  var data = await getDealDetails(params.id) 
  var brand = await getBrand()
  if(!data){
    redirect('/dashboard')
  }
  return (
    <Editproduct data={data} brand={brand}/>
  )
}
