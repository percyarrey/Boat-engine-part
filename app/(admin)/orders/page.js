import React from 'react'
import getOrder from '../../../services/getOrder'
import Orderbtn from '../../components/admin/orders/Orderbtn'
import OrderCard from '../../components/admin/orders/OrderCard'
export default async function Page({searchParams}) {
  var searchParam = searchParams.page ?searchParams.page :0
  searchParam = parseInt(searchParam)
  var Orders= await getOrder('none',2,searchParam)
  return (
    <div>
        <div className='pe-6 flex flex-col pt-6 gap-4 items-center justify-center'>
            {
                Orders.order.map((e,index)=>{
                    return (<OrderCard order={e} key={index}/>)
                })
            }
        </div>
        <Orderbtn page={searchParam} npage={Orders.npage}/>
    </div>
  )
}
