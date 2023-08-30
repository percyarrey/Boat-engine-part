'use client'
export default function Localstorage(){
    try{
        var wishlist =  localStorage?.getItem('wishlist')
        wishlist = JSON.parse(wishlist)
        return wishlist;
    }catch(e){
        console.log(e)
    }
}