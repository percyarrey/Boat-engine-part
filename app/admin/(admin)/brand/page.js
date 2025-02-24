
import React  from 'react'
import Brand from '../../../components/admin/brand/brand'
import  getBrand from '../../../../services/getBrand'
export default async function Page() {
  var data = await getBrand()
  return (
    <>
       <Brand data={data}/>
    </>
  )
}
