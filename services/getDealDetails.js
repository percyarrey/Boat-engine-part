import Products from "@/models/Products";
import connectDB from "../utils/connectDB";
import mongoose from "mongoose";

export const getDealDetails = async(id)=>{
    try{
        await connectDB()
        const objectId = new mongoose.Types.ObjectId(id);
        var data = await Products.find({_id:objectId});
        return JSON.parse(JSON.stringify(data[0]))
    }catch(e){
        console.log(e)
        return
    }

}
