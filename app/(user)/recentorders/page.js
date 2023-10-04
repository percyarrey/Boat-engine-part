import React from 'react'
import Link from 'next/link'
import getOrder from '../../../services/getOrder'

import Recentorder from '../../components/orders/recentorder'

import { getServerSession } from 'next-auth'

import { authOptions } from '../../api/auth/[...nextauth]/route'
export default async function Page() {
  const session = await getServerSession(authOptions)
  console.log(session)
  const Orders = await getOrder(session.user.id,4)
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
          Orders.length>0?
          Orders.map((e,index)=>{
            
            return (
              <Recentorder e={e} key={index}/>
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