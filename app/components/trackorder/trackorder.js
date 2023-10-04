'use client'
import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@mui/material';


import ProgressBar from './progressbar'
import Image from 'next/legacy/image'
import Link from 'next/link';

import { AiOutlineExclamationCircle } from 'react-icons/ai';

export default function TrackOrder({ data }) {
  var Order = data.order
  var Product = data.product

  const handleDownloadPDF = () => {
    const input = document.getElementById('pdf-content');

    html2canvas(input, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        pdf.save('Creative part.pdf');
      })
      .catch((error) => {
        console.error('Error generating PDF: ', error);
      });
  };

  //CONTROL LENGTH
  const controlLength=(txt,len)=>{
        
    if(txt.length>len){
        txt = txt.slice(0,len) + "..."
        return txt
    }
    return txt + ' .'
} 

  return (
    <>
      <div className='w-[97vw] h-[43rem] md:overflow-hidden overflow-x-scroll md:flex justify-center overflow-y-hidden'>
        <div id='pdf-content' className='p-2 px-6 w-[595.28px]  min-w-[595.28px] h-[841.89px]'>
          <div className="bg-white p-4 sm:p-8 shadow border w-full border-gray-200 rounded-sm">
            <h1 className="text-2xl font-semibold mb-6 opacity-80">Summary</h1>
            <div className='flex justify-between'>
              <h4 className="text-lg text-green-900">Creative {"Part's"}</h4>
              <div>
                <span className=' font-semibold'>Order Id:</span>
                <span className='text-[#0E9F6E] ml-1'>{Order.OrderId}</span>
              </div>
            </div>
            {
              Order.status==='Pending'?
                <h1 className="md:text-2xl text-xl font-bold mb-1">{"We"} will review your Order </h1>:
              Order.status==="Delivering"?
                <h1 className="md:text-2xl text-xl font-bold mb-1">{"We're"} Delivering your order</h1>:
                <h1 className="md:text-2xl text-xl font-bold mb-1">{"We're"} processing your Order</h1>
            }

            <div className='flex mt-4 gap-4 lg:gap-[4rem] mb-8'>
              {/* Shipping Address */}
              <div>
                <h2 className="font-semibold">Shipping Address:</h2>
                <div className="mb-0 opacity-80">
                  <span className="font-semibold">Country:</span>
                  <span className="ml-1">{Order.country}</span>
                </div>
                <div className="mb-0  opacity-80 max-w-[12rem]" style={{ wordWrap: 'break-word' }}>
                  <span className=' font-extralight' style={{ textAlign: 'justify' }}>{Order.state}, {Order.town}, {Order.area}, {Order.house}, {Order.land}</span>
                </div>

              </div>
              {/* User Details */}
              <div>
                <h2 className="font-semibold">Client:</h2>
                <div className="mb-0 opacity-80">
                  <span className="font-light capitalize">{Order.fname}</span>
                </div>
                <div className="mb-0 opacity-80">
                  <span className="font-semibold">Tel:</span>
                  <span className="ml-1">{Order.num}</span>
                </div>
              </div>
            </div>

            <div className='pt-3'>
              {/* PROGRESS BAR */}
              <ProgressBar status={Order.status} date={Order.date}/>
            </div>

            {/* Product Details */}
            <div className="pt-12">
              <h2 className="text-lg font-semibold mb-0">Product Details</h2>
              <div className='flex justify-between'>
                <div className='w-[4rem] h-[5rem] relative'>
                  <Image layout='fill' objectFit='contain' src={Product.image} alt={Product.image} />
                </div>
                <div className=' opacity-80'>
                  <span className="ml-1">{controlLength(Product.productname,25)}</span><br/>
                  <span className="ml-1">{Product.brand}</span><br/>
                  <span className="ml-1">{Product.year}</span><br/>
                </div>
                <div className=' opacity-75'>
                  <span className="font-semibold">Brand:</span>
                  <span className="ml-1">{Product.brand}</span>
                </div>
                <div className=' opacity-70'>
                  <span className="ml-1">${Order.price}</span>
                </div>
              </div>
            </div>


          </div>
          <div className='flex justify-end mt-8 px-2'>
            <div className='w-[50%]'>
              <div className='flex justify-between opacity-70'>
                <span className='font-extralight'>Sales + Tax:</span>
                <span>${Order.price}</span>
              </div>
              <div className='mt-1 flex justify-between opacity-70'>
                <span className='font-extralight'>Shipping:</span>
                <span>Free</span>
              </div>
              <hr className='my-3'/>
              <div className='mt-1 flex justify-between opacity-80'>
                <span className=' font-semibold'>Grand Total:</span>
                <span className=' font-bold'>${Order.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-center pt-8'>
        <Button onClick={handleDownloadPDF} type='submit' style={{ maxWidth: '15rem', width: '100%', backgroundColor: '#0E9F6E' }} variant='contained' color='success'>
          Download as Pdf
        </Button>
      </div>
      <div className="pt-3 pb-8">
  <div className='flex pr-5 gap-2'>
  <AiOutlineExclamationCircle size={38} color='red'/>
  <div className='lg:flex items-center gap-1'>
   Notify us if your Order has Frozen, and <strong>{"don't"}</strong> forget to add the{' '}
    <span className="font-semibold"> Order Id </span> to the message {' '}
    <Link href="/contact" className="text-[#0E9F6E]">
      Contact us
    </Link>
  </div>
  </div>
</div>
    </>
  );
}