'use server'
import Products from "../models/Products";
import connectDB from "../utils/connectDB";

export const getProducts = async(num=0,size=4)=>{
    try{
        await connectDB()
        var data = await Products.find({}).limit(size).skip(num);
        return JSON.parse(JSON.stringify(data))
    }catch(e){
        console.log(e)
        return
    }
}

export default getProducts;