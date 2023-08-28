import Editproduct from '@/app/components/admin/Editproduct'
import { getDealDetails } from '@/services/getDealDetails'
import React from 'react'
import { redirect } from 'next/navigation'
export default async function page({params}) {
  var data = await getDealDetails(params.id) 
  if(!data){
    redirect('/dashboard')
  }
  return (
    <Editproduct data={data}/>
  )
}
