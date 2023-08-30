'use client'
export default function Localstorage(){
    var wishlist =  localStorage?.getItem('wishlist')
    wishlist = JSON.parse(wishlist)
    return wishlist;
}