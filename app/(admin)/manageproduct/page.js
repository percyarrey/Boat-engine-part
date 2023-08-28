'use client'
import React from 'react'


//REACT SPINNER
import { MoonLoader } from 'react-spinners'
import { Box, Button, TextField } from '@mui/material'


import Image from 'next/legacy/Image'
import { BsPlus } from 'react-icons/bs'
import { toast } from 'react-toastify'


import ImageCompiling from '@/utils/ImageCompiling'
import axios from 'axios'

function Page() {
  //REACT HOOK DECLARATION
  const [loading,setLoading]=React.useState(false)

  const [data,setdata]=React.useState({
    image:{
      img1:'',
      img2:'',
      img3:'',
      img4:'',
    },
    productname:"",
    brand:"",
    year:"",
    hp:0,
    rating:0,
    price:0,
    description:""
  })

  //HANDLE IMAGES
  const handleImages= async(e)=>{
      const data = await ImageCompiling(e.target.files[0])
      const{name}=e.target
      setdata((prev)=>{
        return{
            ...prev,
            image:{
              ...prev.image,
                [name]:data
            }
        }
      })
      return
  }
  //HANDLE REMOVING IMG
  const handleRemovingImg= async(e)=>{
    setdata((prev)=>{
      return{
          ...prev,
          image:{
            ...prev.image,
              img2:'',
              img3:'',
              img4:'',
          }
      }
    })
    return
}
  //HANDLE CHANGE
  const handleChange=(e)=>{
    const{name,value}=e.target
    setdata((prev)=>{
      return{
          ...prev,
          [name]:value
      }
    })
  }

  //HANDLE SUBMIT
  async function handleSubmit(e){
    e.preventDefault();
    const {image,productname,brand,rating,price,description,year,hp} = data

    if(loading === false){
      if(image.img1&&productname&&brand&&rating&&price&&description&&year&&hp){
          if(price>0){
            if(hp>0){
              CalPrice();
              setLoading(true)
              await axios.post('/api/crudproduct',data)
              .then(res=>{
                res=res.data
                if(res.message==='Product created Succesfully'){
                  toast.success('Product Created Successfully', {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  });
                }else if(res.message==="Product already exist"){
                  toast.warn('Product already exist', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                }else{
                  console.log(res.message)
                  toast.error('Something went wrong !Try Again', {
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
                setLoading(false)
              })
              .catch(error=>{
                  toast.error('Something went wrong !Try Again', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                setLoading(false)
              })
            }else{
              toast.warn("Enter an appropriate Horse Power", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                })
            }
          }else{
            toast.warn("Enter an appropriate price", {
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
      }else{
        toast.warn('Please fill required Information', {
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
    }
  }
  //CALCULATE PRICE
  const CalPrice = () =>{
    var fprice = data.price
    var hp = Math.ceil(data.hp)
    fprice = parseFloat(fprice)
    fprice = parseFloat(fprice.toFixed(2))
    setdata((prev)=>{
      return{
          ...prev,
          price:fprice,
          hp:hp
      }
    })
    return
  }

return (
    <div className='pb-6 pt-1'>
      <h1 className='text-center mytxt font-semibold mt-6 px-6 text-lg'>Add Product</h1>
      
      <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6  ">
            {/* Thumbnail */}
              <div>
                <h5 className='block text-sm font-meduim text-gray-900 dark:text-white'>Thumbnail</h5>
                <div className="flex items-center justify-center w-full">
                      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-[180px]  border-2 border-gray-300 overflow-hidden border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      {
                        data.image.img1?
                          <>
                            <div className='relative h-full'>
                              <Image src={data.image.img1} alt={`Image`} width={180} height={180} objectFit='contain' />
                            </div>
                          </>
                        :
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG (MAX. 1024px1024px) or {'<'}1MB</p>
                          </div>
                      }
                          <input  accept='image/*' onChange={handleImages} id="dropzone-file" name='img1' type="file" className="hidden" />
                    </label>
              </div> 
              </div>
            {/* ADDITIONAL PHOTOS */}
            <div>
              <h5 className='block text-sm mb-2 font-meduim text-gray-900 dark:text-white'>Additional images <small className=' text-green-600'>(Optional)</small> (<b>MAX</b> 3 images)</h5>
              <div className='flex gap-3 h-[80px] overflow-hidden'>
                {/* img2 */}
                <div className='relative h-full w-[85px]'>
                    <label htmlFor="img2" className="w-full flex justify-center h-full font-semibold">
                      <div className='flex flex-col items-center justify-center w-full h-full border-2  px-1 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
                        {
                          data.image.img2?
                            <Image src={data.image.img2} alt={`Image`} width={80} height={80} objectFit='contain' />
                          :
                          <BsPlus/>
                        }
                      <input accept='image/*' onChange={handleImages} type="file" className='hidden' name="img2" id="img2" placeholder=""/>
                      </div>
                    </label>
                </div>
                {/* img3 */}
                <div className='relative h-full w-[85px]'>
                    <label htmlFor="img3" className="w-full flex justify-center h-full font-semibold">
                      <div className='flex flex-col items-center justify-center w-full h-full border-2  px-1 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
                        {
                          data.image.img3?
                            <Image src={data.image.img3} alt={`Image`} width={80} height={80} objectFit='contain' />
                          :
                          <BsPlus/>
                        }
                      <input accept='image/*' onChange={handleImages} type="file" className='hidden' name="img3" id="img3" placeholder=""/>
                      </div>
                    </label>
                </div>
                {/* img4 */}
                <div className='relative h-full w-[85px]'>
                    <label htmlFor="img4" className="w-full flex justify-center h-full font-semibold">
                      <div className='flex flex-col items-center justify-center w-full h-full border-2  px-1 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
                        {
                          data.image.img4?
                            <Image src={data.image.img4} alt={`Image`} width={80} height={80} objectFit='contain' />
                          :
                          <BsPlus/>
                        }
                      <input accept='image/*' onChange={handleImages} type="file" className='hidden' name="img4" id="img4" placeholder=""/>
                      </div>
                    </label>
                </div>
              </div>
              {
                data.image.img2 || data.image.img3 ||data.image.img4?
                  <Button onClick={handleRemovingImg} style={{maxWidth:'25rem',width:'100%',backgroundColor:'#D32F2F',marginTop:'0.4rem'}} variant='contained' color='error'>
                  Remove all
                </Button>:<></>
              }
                <input accept='image/*' type="file" className='hidden' name="image1" id="extraimg" placeholder=""/>
            </div>
            {/* PRODUCT NAME */}
              <div>
                  <label htmlFor="productname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                  <input name='productname' type="text" value={data.productname} onChange={handleChange} id="productname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Engine"/>
              </div>
              {/* BRAND */}
              <div>   
                  <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">brand</label>
                  <select id="brand" value={data.brand} onChange={handleChange} name='brand' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option defaultValue={''}>Choose a brand</option>
                    <option value="TOHATSU">TOHATSU</option>
                    <option value="SUZUKI">SUZUKI</option>
                    <option value="YAMAHA">YAMAHA</option>
                    <option value="MERCURY">MERCURY</option>
                    <option value="OTHERS">OTHERS</option>
                  </select>
              </div>
              {/* YEAR */}
              <div>
                  <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year Build</label>
                  <input name='year' type="text" value={data.year} onChange={handleChange} id="productname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2023"/>
              </div>
              {/* HP */}
              <div>
                  <label htmlFor="hp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Performance (hp)</label>
                  <input type="number" value={data.hp} name='hp' onChange={handleChange} id="hp" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""  />
                  <small className='text-sm text-[#151414c7]'>Perfomance in<b> Horse Power</b> e.g 120</small>
              </div>  
              {/* RATING */}
              <div>   
                  <label htmlFor="Rating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating</label>
                  <select id="Rating" onChange={handleChange} name='rating' value={data.rating} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option  defaultValue={''}>Choose a Rating</option>
                    <option value="1">1 star</option>
                    <option value="2">2 star</option>
                    <option value="3">3 star</option>
                    <option value="4">4 star</option>
                    <option value="4.5">4.5 star</option>
                    <option value="5">5 star</option>
                  </select>
              </div>
              {/* PRICE */}
              <div>
                  <label htmlFor="Price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                  <input type="number" value={data.price} name='price' onChange={handleChange} id="Price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="$"  />
                  <small className='text-sm text-[#151414c7]'>Format <b>amount.cent</b> e.g 192.66</small>
              </div>                
              <div className="bg-white rounded-b-lg dark:bg-gray-800">
                  <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                  <textarea name='description' onChange={handleChange} value={data.description} id="editor" rows="4" className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a description"></textarea>
              </div>
              <div className='flex justify-center'>
                <Button type='submit'  style={{maxWidth:'25rem',width:'100%',backgroundColor:'#00442E'}} variant='contained' color='success'>
                {loading ? <div className='w-ful h-full flex justify-center'><MoonLoader color='white' size={20}/></div>:<span>Save</span>}
                </Button>
            </div>
          </div>
      </form>

    </div>
)
}

export default Page