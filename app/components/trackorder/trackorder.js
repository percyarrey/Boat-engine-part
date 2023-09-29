'use client'
import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@mui/material';


import ProgressBar from './progressbar'

export default function TrackOrder({data}) {
  var Order=data.order
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

  const steps = ['Pending', 'Processing', 'Delivering', 'Delivered'];
  const activeStep = 2;

  return (
    <>
    <div className='w-[98vw] overflow-x-scroll'>
    <div  id='pdf-content' className='p-2 px-6 w-[595.28px] h-[841.89px]'>
        <div  className="bg-white p-4 sm:p-8 shadow-md mx-auto max-w-full rounded-md">
            <h1 className="text-2xl font-semibold text-center mb-3">Order Summary</h1>
            <div className='flex justify-between'>
              <h4 className="text-lg">Creative {"Part's"}</h4>
              <div>
                <span className=' font-semibold'>Order Id:</span>
                <span className='text-[#0E9F6E] ml-2'>{Order.OrderId}</span>
              </div>
            </div>
            <h1 className="md:text-2xl text-xl font-bold mb-1">{"We're"} processing your Order</h1>
            
            <div className='flex mt-4 gap-4 lg:gap-[4rem] mb-8'>
                {/* Shipping Address */}
                <div>
                <h2 className="font-semibold">Shipping Address:</h2>
                    <div className="mb-0 opacity-80">
                    <span className="font-semibold">Country:</span>
                    <span className="ml-2">{Order.country}</span>
                    </div>
                    <div className="mb-0  opacity-80 max-w-[10rem]" style={{wordWrap:'break-word'}}>
                    <span>{Order.state}, {Order.town}, {Order.area}, {Order.house}, {Order.land}</span>
                    </div>
                    
                </div>
                {/* User Details */}
                <div>
                    <h2 className="font-semibold">Client:</h2>
                    <div className="mb-0 opacity-80">
                    <span className="font-extralight">{Order.userName}</span>
                    </div>
                    <div className="mb-0 opacity-80">
                    <span className="font-semibold">Tel:</span>
                    <span className="ml-2">{Order.phoneNumber}</span>
                    </div>
                </div>
            </div>

            <div className=''>
              {/* PROGRESS BAR */}
              <ProgressBar steps={1} />
            </div>

            {/* Product Details */}
            <div className="pt-12">
                <h2 className="text-lg font-semibold mb-0">Product Details</h2>
                <div className="mb-0">
                <span className="font-semibold">Product Name:</span>
                <span className="ml-2">{Order.productName}</span>
                </div>
                <div className="mb-0">
                <span className="font-semibold">Brand:</span>
                <span className="ml-2">{Order.brand}</span>
                </div>
                <div className="mb-0">
                <span className="font-semibold">Price:</span>
                <span className="ml-2 text-green-600">{Order.price}</span>
                </div>
            </div>

            
        </div>
    </div>
    </div>
    
     <div className='flex justify-center py-8'>
        <Button onClick={handleDownloadPDF} type='submit'  style={{maxWidth:'15rem',width:'100%',backgroundColor:'#0E9F6E'}} variant='contained' color='success'>
        Download as Pdf
        </Button>
     </div>
    </>
  );
}