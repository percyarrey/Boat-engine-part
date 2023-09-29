'use client'
import axios from 'axios';
import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
const OrderCard = ({ order }) => {
  var date= new Date(order.date)
  const router = useRouter()
  const handleChange =async(e)=>{
    var data = {id:order.OrderId,status:e.target.value}
    await axios.put('api/crudorder',data)
      .then(res=>{
        res=res.data.res
        if(res===1){
          toast.success('Status Updated Successfully', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          setTimeout(() => {
            router.refresh()
          }, 800);
        }else{
          toast.warn('Something went wrong !Try again', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        }
      })
      .catch(e=>{
        console.log(e)
        toast.error('Something went wrong !Try again', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      })
  }

  return (
    <div className="mb-3 w-full max-w-[40rem] min-h-[14rem] border border-gray-300 rounded-sm bg-slate-100 shadow-md p-2">
      <div className="card-header flex justify-between">
        <h5 className=" text-lg font-semibold">Order <span className='font-bold text-[#0E9F6E]'>#{order.OrderId}</span></h5>
        {order.new === 1 && (
          <div className="text-white px-1 rounded-md shadow-sm flex items-center" style={{ backgroundColor: '#DC3545', transform: 'rotateZ(-2deg)' }}>
            New
          </div>
        )}
      </div>
      <hr className='my-2'/>
      <div className="card-body">
        <p className=" capitalize">Customer: {order.fname}</p>
        <p className="card-text">Email: {order.email}</p>
        <p className="card-text">Date: {date.getDate()}-{date.toLocaleString('en-US', { month: 'short' })}-{date.getFullYear()} - {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</p>

        <p className="mb-4">
          Status:
                    <select className='ml-2 rounded-md h-9' onChange={handleChange} value={order.status}>
                      <option value={'Pending'}>Pending</option>
                      <option value={'Processing'}>Processing</option>
                      <option value={'Delivering'}>Delivering</option>
                      <option  value={'Delivered'}>Delivered</option>
                    </select>
        </p>
        <a href={`/trackorder/${order.OrderId}`} className="text-white ms-2 p-2 rounded shadow  bg-[#0E9F6E]">
          View Details
        </a>
      </div>
    </div>
  );
};

export default OrderCard;