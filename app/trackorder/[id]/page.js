
import React from 'react';


import TrackOrder from '../../components/trackorder/trackorder'
import { getOrder } from '../../../services/getOrder';
import { redirect } from 'next/navigation'

export default async function Page({params}) {
  var data = await getOrder(params.id)
  if(!data){
    redirect('/deals')
  }
  return (
    <>
      <TrackOrder data={data} />
    </>
  );
}