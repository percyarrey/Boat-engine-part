'use client'
import {createSlice} from '@reduxjs/toolkit'
var wishlist =  localStorage?.getItem('wishlist')
wishlist = JSON.parse(wishlist)
const initialState = {
    wishlist : wishlist || []
}

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers:{
        addWishlist:(state,action)=>{
            state.wishlist = action.payload
            var wishlist = JSON.stringify(action.payload)
            localStorage?.setItem('wishlist',wishlist)
        } 
    }
})
 
export default wishlistSlice.reducer

export const {addWishlist } = wishlistSlice.actions