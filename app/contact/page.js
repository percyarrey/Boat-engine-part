'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


//REACT SPINNER
import { MoonLoader } from 'react-spinners'
import { toast } from 'react-toastify'

function Page() {
  //REACT HOOK DECLARATION
  const [loading, setLoading] = useState(false);
const [data, setdata] = useState({
  name: "",
  email: "",
  message: "",
})

const router = useRouter();

// HANDLE CHANGE
const handleChange = (e) => {
  const { name, value } = e.target;
  setdata((prev) => ({
    ...prev,
    [name]: value
  }));
};

const handleEmail = async(e) => {
  e.preventDefault();
  const { name, email, message } = data;
  if (loading === false) {
    setLoading(true);
    if (name && email && message) {
      try {
        const res = await axios.post('/api/email', {name:name,email:email,message:message});
        if (res.data.msg) {
          toast.success('Message sent Successfully', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error('Something went wrong! Please try again', {
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
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.warn('Please fill in the information', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
    setLoading(false);
  }
};
  return ( 
  <section className="mb-32 text-center">
    <div className="py-12 md:px-12">
      <div className="container mx-auto xl:px-32">
        <div className="grid items-center lg:grid-cols-2">
          <div className="mb-12 md:mt-12 lg:mt-0 lg:mb-0">
            <div
              className="relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:px-12 lg:-mr-14">
              <h2 className="mb-12 mytxt text-3xl font-bold">Contact us</h2>
              <form>
                {/*NAME */}
                <div className='w-full'>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-start text-gray-900 dark:text-white">Name:</label>
                    <input name='name' onChange={handleChange} required value={data.name} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter full name"/>
                </div>
                {/*EMAIL*/}
                <div className='w-full mt-3'>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-start text-gray-900 dark:text-white">Email:</label>
                    <input name='email' onChange={handleChange} required value={data.email} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="abc@email.com"/>
                </div>

                <div className="bg-white mt-3 rounded-b-lg dark:bg-gray-800">
                  <label htmlFor="message" className="block text-start mb-2 text-sm font-medium text-gray-900 dark:text-white">Message :</label>
                  <textarea id="message" name='message' onChange={handleChange} required value={data.message} rows="4" className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a message"></textarea>
              </div>
                <button
                  type="submit"
                  data-te-ripple-init
                  onClick={handleEmail}
                  className="inline-block w-full rounded bg-[#0d6648] px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] lg:mb-0">
                  {loading ? <div className='w-ful h-full flex justify-center'><MoonLoader color='white' size={20}/></div>:<span>Send</span>}
                </button>
              </form>
            </div>
          </div>
          <div className="md:mb-12 lg:mb-0">
            <div
              className="relative h-[700px] rounded-lg shadow-lg dark:shadow-black/20">
              <iframe
                src="https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="absolute left-0 top-0 h-full w-full rounded-lg"
                frameBorder="0"
                allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Page