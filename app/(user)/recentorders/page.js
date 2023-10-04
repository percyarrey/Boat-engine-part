import React from 'react'

import getOrder from '../../../services/getOrder'

import Recentorder from '../../components/orders/recentorder'

import { getServerSession } from 'next-auth'

import { authOptions } from '../../api/auth/[...nextauth]/route'
export default async function Page() {
  const session = await getServerSession(authOptions)
  const Orders = await getOrder(session.user.id,4,0)
  return (
    <div className='flex justify-center pt-4 pb-12'>
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

        <hr className=' mt-2 pb-2'/>
        {
          Orders && Orders.length>0?
          Orders.map((e,index)=>{
            return (
              <Recentorder e={e} key={index}/>
            )
          }):
          <>
              <div className='w-full' style={{display:'flex',minHeight:'15rem',justifyContent:'center',alignItems:'center'}} >
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