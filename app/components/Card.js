'use client'
import { Badge, Button, IconButton, Tooltip } from '@mui/material'
import Image from 'next/legacy/Image'
import { useRouter } from 'next/navigation'
import React from 'react'

import { BsHeart, BsHeartFill, BsStarFill, BsStarHalf } from 'react-icons/bs'

//REDUX
import { useDispatch, useSelector } from 'react-redux'
import { addWishlist } from '@/store/wishlistSlice'
import { toast } from 'react-toastify'

//SESSION
import { useSession } from 'next-auth/react'

import {usePathname} from 'next/navigation'
import axios from 'axios'
export default function Card(props) {
    //SESSION
  const { data, status,loading } = useSession()
    //IsActive
    const pathname =usePathname()
    const isActive = (path) =>{
        return pathname === path;
    }

    //REACT REDUX
    props= props.data
    const dispatch = useDispatch()
    const wishlist = useSelector((state)=>state.wishlist.wishlist)
    //NAVIGATION
    const router = useRouter()
    //CONTROL LENGTH
    const controlLength=(txt,len)=>{
        
        if(txt.length>len){
            txt = txt.slice(0,len) + "..."
            return txt
        }
        return txt + ' .'
    }  
    //CONTROL PRICE
    var price = props.price
    var priceInt = Math.floor(price)
    var priceDec = price % 1
    priceDec = priceDec.toString()
    priceDec = priceDec.slice(1,4)
    if(!priceDec){
        priceDec='00'
    }
    //CONTROL RATING
    const Stars = (num)=>{
        return Array(num).fill(<BsStarFill color="#0AAC0C" />)
    };
    const ControlRating=(num)=>{
        if(num===4.5){
            return Stars(5).map((star,index)=>{
                if(index===4){
                    return (
                            <span key={index}><BsStarHalf color="#0AAC0C" /></span>
                    )
                }else{
                    return (
                            <span key={index}>{star}</span>
                    )
                }
                
            })
        }else{
            return (Stars(num).map((star,index)=>{
                return (
                        <span key={index}>{star}</span>
                )
            }))
        }
    }
    //HANDLE CLICK
    const handleClick =(e)=>{
        if(e.target.closest('[name="wishlist"]')){
           if(wishlist.filter(e=>e._id==props._id).length===0){
            const newWishlist = [...wishlist,props]
            dispatch(addWishlist(newWishlist)) 
            toast.success('Product Added to Wishlist', {
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
                var newWishlist = wishlist.filter(e=>e._id!=props._id)
                newWishlist =newWishlist? [...newWishlist]:[]
                dispatch(addWishlist(newWishlist))
                toast.warn('Product removed from Wishlist', {
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
        }else if(e.target.closest('[name="actions"]')){
        }else{
            router.push(`/deals/${props._id}`)
        }
    }
    //HANDLE DELETE
    const handleDelete=async(e)=>{
        if(data?.user?.role ==='admin'){
            const result = confirm('Are you Sure You Want to Delete')
            if(result===true){
                await axios.delete(`/api/crudproduct?id=${props._id}`)
            .then((res)=>{
                if(res.data.message==='Product Deleted Successfully'){
                    toast.success(res.data.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    });
                    setTimeout(() => {
                    router.refresh()
                    }, 1990);
                }else{
                    toast.warn('Product Delete Failed !', {
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
                return;
            })
            .catch((e)=>{
                toast.error('Something went wrong Try again!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            return;
            })
            }
        }
    }
  return (
    
  <div onClick={handleClick} className="w-full  max-w-[360px] relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 myCard cursor-pointer h-full">
        <div className='rounded-lg relative overflow-hidden bg-[#F5F6F6]' style={{width:'100%',height:'14rem'}}>
            <Image className="rounded-t-lg" src={props.image.img1} alt={props.productname} layout='fill'  objectFit='cover'/>
            <div className='flex justify-end'>
                <Tooltip title='Wishlist' className=' ' >
                <IconButton size="large" aria-label="wishlist" name='wishlist'  color="inherit">
                    <span    className=' bg-white p-2 rounded-full'>
                        
                        {
                            wishlist.filter(e=>e._id===props._id).length===0 ?
                            <BsHeart   color='darkred' size={17}/>:
                            <BsHeartFill  color='darkred' size={17}/>
                        }
                    </span>
                </IconButton>
                </Tooltip>
            </div>
        </div>
      <div className="p-1 pr-5">
          <div className='flex justify-between'>
              <h5 className=" font-[600] text-[1.1rem]" >
                {controlLength(props.productname,22)}
              </h5>
              <div style={{fontFamily:'Helvetica, sans-serif,Arial'}} className='font-semibold text-gray-900'>
                    <span className='text-xs absolute'>$</span>
                    <span className='ps-2'>
                        {priceInt}
                    </span>
                    <span className='text-xs absolute'>{priceDec}</span>
                </div>
          </div>
          <div className='mt-1 text-md text-black'>
            {controlLength(props.brand,22)} {props.year}
          </div>
          <p className="mt-1 font-semibold text-sm text-gray-900 dark:text-gray-400">1 x {props.hp} hp / {Math.ceil(props.hp *0.746)} kW</p>
          <p className="mt-1 text-xs text-gray-700 dark:text-gray-400">{controlLength(props.description,35)}</p>
          <div className='mt-1 flex gap-1'>
            
            {
               ControlRating(props.rating)
            }
          </div>
          <div name='actions' className='flex justify-between mt-auto'>
          {
            !isActive('/dashboard')?
                <Button  onClick={()=>{router.push('/checkout/'+props._id)}} style={{border:'1px solid',textTransform:'none',borderRadius:'9999px',paddingRight:'1rem',paddingLeft:'1rem',backgroundColor:'#066E4C',color:'white',marginTop:'0.5rem',marginBottom:'0.5rem'}}>Place an Order</Button>
            :
                <>
                <Button onClick={()=>{router.push('/manageproduct/'+props._id)}} style={{border:'1px solid',textTransform:'none',borderRadius:'9999px',paddingRight:'1rem',paddingLeft:'1rem',backgroundColor:'#066E4C',color:'white',marginTop:'0.5rem',marginBottom:'0.5rem'}}>Edit</Button>
                <Button onClick={handleDelete} style={{border:'1px solid',textTransform:'none',borderRadius:'9999px',paddingRight:'1rem',paddingLeft:'1rem',backgroundColor:'#D32F2F',color:'white',marginTop:'0.5rem',marginBottom:'0.5rem'}}>Delete</Button>
                </>

          }
          </div>
      </div>
  </div>

  )
}
