
import React from 'react';


import TrackOrder from '../../components/trackorder/trackorder'
import { getOrder } from '../../../services/getOrder';

export default async function Page({params}) {
  var data = await getOrder(params.id)
  return (
    <>
      <TrackOrder data={data} />
    </>
  );
}