import Products from "../models/Products";
import Images from "../models/Images";
import connectDB from "../utils/connectDB";
import mongoose from "mongoose";

export const getDealDetails = async(id)=>{
    try{
        await connectDB()
        const objectId = new mongoose.Types.ObjectId(id);
        var data = await Products.find({_id:objectId});
        data=data[0];
        var images=await Images.find({productId:objectId});
        images=images[0]
        data={
            _id:data._id,
            productname:data.productname,
            brand:data.brand,
            year:data.year,
            hp:data.hp,
            rating:data.rating,
            price:data.price,
            description:data.description,
            image:{
                img1:data.image,
                img2:images.img2,
                img3:images.img3,
                img4:images.img4
            }
        }
        return JSON.parse(JSON.stringify(data))
    }catch(e){
        console.log(e)
        return
    }

}
