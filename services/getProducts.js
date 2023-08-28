import Products from "@/models/Products";
import connectDB from "../utils/connectDB";

export const getProducts = async(num=0)=>{
    try{
        await connectDB()
        const data = await Products.find({}).limit(11).skip(num);
        /* const res = await fetch(`${process.env.BACKEND_URI}crudproduct`, {
        method: "GET",
        cache: "force-cache",
        });
        const {data} = await res.json(); */
        return JSON.parse(JSON.stringify(data))
    }catch(e){
        console.log(e)
        return
    }

}

export default getProducts;