'use server'
import getProducts from "../services/getProducts";
import getDealProduct from "../services/getDealProducts";

export async function fetchProducts(num=0,size=4){
    const data = await getProducts(num,size)
    return data
}
export async function fetchDealProducts(num,searchParams){
    const data = await getDealProduct(num,searchParams)
    return data
}