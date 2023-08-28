'use client'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination,Autoplay } from 'swiper';
import Carouselcontent from './Carouselcontent';
import { useEffect } from 'react';

export default function Carousel(props) {

  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination,Autoplay]}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={3000}
        className="mySwiper h-full min-h-[55vh]"
      >
        <SwiperSlide>
          <Carouselcontent color='bg-[#182e2ee5]' btn='#016343' discount={50} data={props.data[0]}/>
        </SwiperSlide>
        <SwiperSlide>
          <Carouselcontent color='bg-[#09212ce6]' btn='#007AFF' discount={20} data={props.data[1]}/>
        </SwiperSlide>
        <SwiperSlide>
          <Carouselcontent color='bg-[#271814c4]'  btn='#D32F2F' discount={80} data={props.data[2]}/>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
