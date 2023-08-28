'use client'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';


// import required modules
import { Scrollbar } from 'swiper';
import Card from '../Card';

export default function Slider(props) {

  return (
    <>
      <Swiper
        className='fade-edge-swiper'
        grabCursor
        scrollbar={{
          hide:false,

        }}
        slidesPerView={'auto'}
        spaceBetween={8}
        breakpoints={{
           640:{
            slidesPerView:'auto',
            spaceBetween:10
           },
           768:{

           },
           1024:{
            scrollbar:{
              hide:true,
            },
            spaceBetween:16,
           }         
        }}
        modules={[Scrollbar]}
        style={{paddingBottom:'1rem'}}

      >
        {
          props.data.map((e,index)=>{
            return(
                <SwiperSlide key={index} className='max-w-[287px]' style={{height:'405.6px'}}>
                  <Card data={e}/>
                </SwiperSlide>
            )
          })
        }
        </Swiper>
    </>
  );
}
