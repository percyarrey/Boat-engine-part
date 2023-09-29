import Order from "../models/Order";
import Products from "../models/Products";
import connectDB from "../utils/connectDB";

export const getOrder = async(id)=>{
    try{
        await connectDB()
        var order = await Order.find({OrderId:id});
        order = order[0]
        
        var Product = await Products.find({_id:order.productId})
        Product=Product[0]
        order={
            order,
            product:Product
        }
        return JSON.parse(JSON.stringify(order))
    }catch(e){
        console.log(e)
        return
    }
}

export default getOrder;