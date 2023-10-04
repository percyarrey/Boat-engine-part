import React from 'react'
import Link from 'next/link'
import getOrder from '../../../services/getOrder'

import { getServerSession } from 'next-auth'

import { authOptions } from '../../api/auth/[...nextauth]/route'
export default async function Page() {
  /* const session = await getServerSession(authOptions)

  const Orders = await getOrder(session.user.id,4) */
  var Orders;
  return (
    <div className='flex justify-center pb-12'>
      <div className=' max-w-[40rem] w-full pe-6'>
        <div className=' font-bold flex justify-between'>
          <div className=' text-[#0E9F6E]'>
            OrderId
          </div>
          <div>
            Date
          </div>
          <div>
            Actions
          </div>
        </div>

        <hr className=' mt-4 pb-2'/>

        {
          Orders>0?
          Orders.map((e,index)=>{
            var date= new Date(e.date)
            return (
              <div key={index} className='py-4 px-2 flex justify-between'>
                <div className=' font-semibold'>
                  {e.OrderId}
                </div>
                <div>
                  {date.getDate()}-{date.toLocaleString('en-US', { month: 'short' })}-{date.getFullYear()} - {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
                </div>
                <div>
                  <Link className='bg-[#0E9F6E] p-2 rounded-md shadow-sm text-white' href={'/trackorder/'+e.OrderId}>Track Order</Link>
                </div>
              </div>
            )
          }):
          <>
              <div className='w-[100vw]' style={{display:'flex',minHeight:'15rem',justifyContent:'center',alignItems:'center'}} >
                {/* <ClipLoader size={100} color='blue'/> */}{/* Loading */}
                  <div className=' text-xl text-red-600 font-semibold' role='status'>
                    No Order Found
                  </div>
              </div>
            </>
        }
      </div>
    </div>
  )
}