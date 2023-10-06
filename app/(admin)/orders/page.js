import React from 'react'
import getOrder from '../../../services/getOrder'
import Orderbtn from '../../components/admin/orders/Orderbtn'
import OrderCard from '../../components/admin/orders/OrderCard'
import Link from 'next/link'

import SortStatus from '../../components/admin/orders/SortStatus'
export default async function Page({searchParams}) {
  var searchParam = searchParams.page ?searchParams.page :0
  searchParam = parseInt(searchParam)
  var Orders= await getOrder('none',2,searchParam,searchParams.status)

  
  return (
    <div>
      <h1 className="text-2xl text-center font-bold text-[#0d2a20]">Placed Orders</h1>
      <SortStatus  searchParams={searchParams}/>
        {
          Orders?.order?.length>0?
          <>
            <div className='pe-6 flex flex-col pt-6 gap-4 items-center justify-center'>
              {
                  Orders.order.map((e,index)=>{
                      return (<OrderCard order={e} key={index}/>)
                  })
              }
            </div>
            <Orderbtn page={searchParam} searchParams={searchParams} npage={Orders.npage} pages={Orders.pages}/>
          </>:
          <div className='min-h-[50vh] flex justify-center items-center'>
            <h1 className=' text-red-600 font-semibold text-xl'>No Order Found <Link className=' text-sky-500 underline' href={'/dashboard'}>Return dashboard</Link></h1>
          </div>
        }
    </div>
  )
}
