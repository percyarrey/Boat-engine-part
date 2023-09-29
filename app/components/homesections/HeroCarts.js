import React,{useEffect,useState} from 'react'

import { fetchProducts } from '../../../server actions/actions'


import Slider from '../homepage/Slider'

export default function HeroCarts(props) {
    const [data,setData] = useState()

    useEffect(()=>{
      (
        async()=>{
          var data =await fetchProducts(3)
          setData(data)
          props.handle()
        }
      )()
    },[])

  return (
    <section className="pt-6 pb-4">
        <h5 className="mytxt font-bold text-2xl">Best Selling Boats Engine</h5>

        <div className="pt-3">
          {
            data &&
            <Slider data={data}/>
          }
        </div>
      </section>
  )
}
