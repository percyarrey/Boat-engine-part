'use client'
import { addWishlist } from '@/store/wishlistSlice';
import { Button } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {useRouter} from 'next/navigation'
export default function Wishlistbtn(props) {
    const router = useRouter()
    props=props.data
    const wishlist = useSelector((state)=>state.wishlist.wishlist)
    const dispatch = useDispatch()
    const handleClick = ()=>{
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
    }
  return (
    <>
        <Button onClick={()=>{router.push('/checkout/' + props._id)}}  style={{width:'8rem',backgroundColor:'#00442E',borderRadius:'9999px',textTransform:'none'}} variant='contained' color='success'>
              Place Order
        </Button>
        {
            wishlist.filter(e=>e._id==props._id).length===0 ?
              <Button onClick={handleClick}  style={{width:'8rem',borderRadius:'9999px',textTransform:'none'}} variant='outlined' color='success'>
                  Wishlist
              </Button>:
              <Button  onClick={handleClick} style={{width:'8rem',borderRadius:'9999px',textTransform:'none'}} variant='outlined' color='error'>
                  Remove
              </Button>
          }
    </>
  )
}
