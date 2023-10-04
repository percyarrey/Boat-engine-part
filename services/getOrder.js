'use server'
import Order from "../models/Order";
import Products from "../models/Products";
import connectDB from "../utils/connectDB";

export const getOrder = async(id,type=0,page=0)=>{
    try{
        await connectDB()
        if(type===0){
            var order = await Order.find({OrderId:id});
            order = order[0]
            order.new=0;
            order.save()
            var Product = await Products.find({_id:order.productId})
            Product=Product[0]
            order={
                order,
                product:Product
            }
        }
        if(type===1){
            var order = await Order.find({new:1}).countDocuments()
        }
        if(type===2){
            page=page*5
            var order = await Order.find({}).limit(5).sort({new:-1}).skip(page)
            var npage = await Order.find({}).limit(5).sort({new:-1}).skip(page+5).countDocuments()>0
            return {order:JSON.parse(JSON.stringify(order)),npage:npage}
        }
        if(type===4){
            var order = await Order.find({userId:id});
        }
        return JSON.parse(JSON.stringify(order))
    }catch(e){
        console.log(e)
        return
    }
}

export default getOrder;