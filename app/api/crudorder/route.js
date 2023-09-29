import connectDB from "../../../utils/connectDB";
import Order from "../../../models/Order";
import {NextResponse } from "next/server";

export async function POST(request){
    var {fname,email,country,num,pin,house,area,land,town,state,productId,userId,price} = await request.json();
    await connectDB()
    var order = await Order.create({fname,email,country,num,pin,house,area,land,town,state,productId,userId,price})
    if(order){
      return NextResponse.json({res:true,id:order.OrderId},{status:201})
    }
    return NextResponse.json({res:false},{status:201})
}

export async function PUT(request){
  var {id,status} =  await request.json()
  if(id){
    var order = await Order.findOne({OrderId:id})
    if(order){
      order.status=status
      order.save()
      return NextResponse.json({res:1,id:order.OrderId},{status:201})
    }
  }
  return NextResponse.json({res:0},{status:201})
}

export async function GET(req){
  const { searchParams } = new URL(req.url);
  var id = searchParams.get("id");
  if(id){
    var order = await Order.findOne({OrderId:id})
    if(order){
      return NextResponse.json({message:1,id:order.OrderId},{status:201})
    }
  }
  return NextResponse.json({message:0},{status:201})
}

export async function DELETE(req){
  /* const { searchParams } = new URL(req.url);
  var id = searchParams.get("id");
  await connectDB()
  const product = await Products.findOne({_id:id})
  if (product) {
    // Delete the Product
    const res = await Products.deleteOne({_id:product._id})
    await Images.deleteOne({productId:product._id})
    // run check
    if(res){
      return NextResponse.json({message: 'Product Deleted Successfully'},{status:201})
    }else{
      return NextResponse.json({message: 'Product Delete Failed'},{status:201})
    }
  } else {
    return NextResponse.json({message: 'Product Delete Failed'},{status:201})
  } */

}