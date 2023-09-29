import React,{useEffect,useState} from 'react'

import { fetchProducts } from '../../../server actions/actions'


import Slider from '../homepage/Slider'

export default function BrandCarts(props) {

  const [data,setData] = useState()

  useEffect(()=>{
    (
      async()=>{
        var data =await fetchProducts(7)
        setData(data);
        props.handle();
      }
    )()
  },[])

  return (
    <section className="pt-6 pb-4">
        <h5 className="mytxt font-bold text-2xl">{"Engine's"} From Top Brand</h5>
        <div className="pt-3">
          {
            data &&
            <Slider data={data}/>
          }
        </div>
    </section>
  )
}
