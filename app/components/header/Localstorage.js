'use client'
export default function Localstorage(){
    try{
        if(typeof window != 'undefined'){
            var wishlist =  localStorage?.getItem('wishlist')
            wishlist = JSON.parse(wishlist)
            return wishlist;
        }
    }catch(e){
        console.log(e)
        return "";
    }
}