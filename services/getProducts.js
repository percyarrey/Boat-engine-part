import Products from "../models/Products";
import connectDB from "../utils/connectDB";

export const getProducts = async(num=0)=>{
    try{
        await connectDB()
        var data = await Products.find({}).limit(11).skip(num);
        data = data.map((e,index)=>{
            e.image={img1:e.image.img1}
            return e
        })
        return JSON.parse(JSON.stringify(data))
    }catch(e){
        console.log(e)
        return
    }

}

export default getProducts;