import Herovideo from '@/app/components/homepage/Herovideo';
import Carousel from "./components/homepage/Carousel";

import Slider from "./components/homepage/Slider";
import Discount from './components/homepage/Discount';
import Trending from './components/homepage/Trending';
import  getProducts  from '@/services/getProducts';
import Card from './components/Card';
import Homeproducts from './components/homepage/Homeproducts';
import { Button } from '@mui/material';
import Link from 'next/link';

export async function getProduct(){
  const data = await getProducts();
  return data
}

export default async function Home() {
  const data = await getProduct()
  if(!data){
    return (
      <div className=' text-lg'>No Product Found</div>
    )
  }
  const slider1 = data.slice(3,7)
  const slider2 = data.slice(7,11)
  return (
    <main>
      {/* HERO */}
      <section id="hero" className="overflow-hidden w-full ">
          <Herovideo/>
        <div className="h-full">
          <Carousel data = {data}/>
        </div>
      </section>
  <div className=" relative top-[-0.2rem]  bg-white">
      {/* HERO CARTS */}
      <section className="pt-6 pb-4">
        <h5 className="mytxt font-bold text-2xl">Best Selling Boats Engine</h5>

        <div className="pt-3">
          <Slider  data={slider1}/>
        </div>
      </section>
      {/* DISCOUNT */}
      <section className=' bg-[#8FCBE3]'>
        <Discount/>
      </section>
      {/* BRANDS CARTS */}
      <section className="pt-6 pb-4">
        <h5 className="mytxt font-bold text-2xl">{"Engine's"} From Top Brand</h5>
        <div className="pt-3">
          <Slider data={slider2}/>
        </div>
      </section>

      {/* TRENDING PRODUCTS */}
      <section>
        <h5 className="mytxt font-bold text-2xl">Trending Products For You</h5>
          <Trending/>
      </section>
      
      {/* Extra Products */}
      <h5 className="mytxt mt-4 pl-1 font-bold text-2xl">All Products</h5>
      <section className='flex px-2 justify-center'>
        <div className=' w-full grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          <Homeproducts/>
        </div>
      </section>
      <section className='flex justify-center'>
        <Link href='/deals'  style={{maxWidth:'25rem',width:'100%',marginTop:'1rem'}}>
          <Button style={{width:'100%'}} variant='outlined' color='success'>
            <span>Show More</span>
          </Button>
        </Link>
      </section>
      {/* HIDING */}
      <section className='h-0'>
        <div className='h-[1rem] bg-white'>
        
        </div>
      </section>
</div>
      
    </main>
  )
}
