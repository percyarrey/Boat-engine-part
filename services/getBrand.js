import Brand from "../models/brand";
import connectDB from "../utils/connectDB";

export const getBrand = async(num=0)=>{
    try{
        await connectDB()
        var data = await Brand.find({});
        return JSON.parse(JSON.stringify(data))
    }catch(e){
        console.log(e)
        return
    }
}

export default getBrand;