import React, { useEffect, useState } from 'react' 
import Carousel from '../homepage/Carousel'
import Herovideo from '../homepage/Herovideo'

import { fetchProducts } from '../../../server actions/actions'

function Hero(props) {
  const [data,setData] = useState()
  const [Video,setVideo] = useState(false)
  useEffect(()=>{
    (
      async()=>{
        var data =await fetchProducts(0,3)
        setData(data);
        props.handle()
      }
    )()
  },[])
  const VideoRef = ()=>{
      setVideo(true)
  }

  props.VideoRef.current=VideoRef
   return (
    <section id="hero" className="overflow-hidden w-full">
      {
          Video &&
          <Herovideo/>
      }
      <div className="h-full">
        {
          data && <Carousel data={data}/>
        }
      </div>
    </section>
   )
 }
 
 export default Hero