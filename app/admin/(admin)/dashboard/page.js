
import React from 'react';

import { FaEdit, FaShoppingBasket, FaStar, FaTrademark,FaPlus} from 'react-icons/fa';

//GRAPH
import Graph from '../../../components/admin/Graph'
import Link from 'next/link';

import getOrder from '../../../../services/getOrder'
export default async function page() {
  var Order = await getOrder('none',1);
  return (
    <>
      <h1 className="text-3xl text-center font-bold mb-4 pt-6">Dashboard</h1>
      <section className='flex gap-x-10 gap-y-6 justify-center flex-wrap pb-6'>
      {/* RECENT ORDERS */}
      <Link href={'/admin/orders'}>
      <div className="flex items-center justify-center space-x-1 w-[17rem] relative shadow-sm hover:shadow-md rounded-lg bg-gray-200">
        <span className="flex items-center justify-center w-10 h-10 bg-[#FFB300] text-white rounded-full">
          <FaShoppingBasket size={20} />
          {
            Order!=0&&
            <span className="absolute top-1 right-2 -mt-1 -mr-1">
            <div className=' bg-red-700 p-1 w-6 flex items-center justify-center h-6 rounded-full shadow-md'>{Order}</div>
          </span>
          }
        </span>
        <button className="flex flex-col justify-center items-start text-gray-800 px-4 py-2 rounded-lg">
          <span className="font-bold leading-tight">Recent Orders</span>
          <small className="text-sm opacity-70">View your recent orders</small>
        </button>
      </div>
      </Link>


      {/* MANAGE BRAND */}
      <Link href={'/admin/brand'}>
      <div className="flex items-center justify-center space-x-1 w-[17rem] shadow-sm hover:shadow-md rounded-lg bg-gray-200">
        <span className="flex items-center justify-center w-10 h-10 bg-[#1A5843] text-white rounded-full">
          <FaTrademark size={20} />
        </span>
        <button className="flex flex-col justify-center items-start text-gray-800 px-4 py-2 rounded-lg">
          <span className="font-bold leading-tight">Manage Brand</span>
          <small className="text-sm opacity-70">Update your various brand</small>
        </button>
      </div>
      </Link>

      {/* CUSTOMIZE PRODUCT */}
      <Link href={'/admin/customize'}>
      <div className="flex items-center justify-center space-x-1 w-[17rem] shadow-sm hover:shadow-md rounded-lg bg-gray-200">
        <span className="flex items-center justify-center w-10 h-10 bg-[#1A5843] text-white rounded-full">
          <FaEdit size={20} />
        </span>
        <button className="flex flex-col justify-center items-start  text-gray-800 px-4 py-2 rounded-lg">
          <span className="font-bold leading-tight">Customize your product</span>
          <small className="text-sm  opacity-70">Edit and Delete Product here</small>
        </button>
      </div>
      </Link>


      {/* ADD PRODUCT */}
      <Link href={'/admin/manageproduct'}>
      <div className="flex items-center justify-center space-x-1 w-[17rem] shadow-sm hover:shadow-md rounded-lg bg-gray-200">
      <span className="flex items-center justify-center w-10 h-10 bg-[#1A5843] text-white rounded-full">
        <FaPlus size={20} />
      </span>
      <button className="flex flex-col justify-center items-start text-gray-800 px-4 py-2 rounded-lg">
        <span className="font-bold leading-tight">Add Product</span>
        <small className="text-sm opacity-70">Create a new product listing</small>
      </button>
      </div>
      </Link>
      </section>

      <section>
        <Graph/>
      </section>
    </>
  )
}
