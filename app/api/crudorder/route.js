import connectDB from "../../../utils/connectDB";
import Order from "../../../models/Order";
import {NextResponse } from "next/server";
import Products from "../../../models/Products";
import { sendEmail } from "../../../utils/sendgrid";

export async function POST(request){
    var {fname,email,country,num,pin,house,area,land,town,state,productId,userId,price} = await request.json();
    await connectDB()
    var order = await Order.create({fname,email,country,num,pin,house,area,land,town,state,productId,userId,price})
    if(order){
      const address = order.state + ", " + order.town + ", " + ", " + order.area + ", " + order.house + ", " + order.land

      var date = new Date(order.date);
      date.setDate(date.getDate() + 7);
      var cdate = new Date(order.date);

      var deliverDay = date.toLocaleString('en-US', { weekday: 'long' })
      var deliverMonth = date.toLocaleString('en-US', { month: 'long' })

      date = deliverDay + ", " + date.getDate() + " " + deliverMonth + " " + date.getFullYear()


      var Product = await Products.find({_id:order.productId})
      Product=Product[0]


      //CLIENT ORDER
      var msg = {
        to:email,
        from:process.env.EMAIL,
        template_id: 'd-f432f7e18a2749869b53acea6e023ddb',
        dynamic_template_data: {
          orderid:order.OrderId,
          name:order.fname,
          email: order.email,
          country:order.country,
          address:address,
          Ddate:date,
          date:cdate.getDate() + ", " +cdate.toLocaleString('en-US', { month: 'short' }) + " " + cdate.getFullYear(),
          pname:Product.productname,
          brand:Product.brand,
          year:Product.year,
          price:order.price,
          image:`<img alt="${Product.productname}" src="{{{${Product.image}}}}" width="104" height="104"/>`,
        },
      };
      try {
        await sendEmail(msg);
      } catch (error) {
        console.error(error);
      }


      //ADMIN ORDER
      msg = {
        to:process.env.EMAIL,
        from:process.env.EMAIL,
        template_id: 'd-6b8c778f365a4d39969bd7a4c302dc65',
        dynamic_template_data: {
          orderid:order.OrderId,
          name:order.fname,
          email: order.email,
          country:order.country,
          address:address,
          date:date,
          pname:Product.productname,
          brand:Product.brand,
          year:Product.year,
          price:order.price,
          image:`<img alt="${Product.productname}" src="${Product.image}" width="104" height="104"/>`,
        },
      };
      try {
        await sendEmail(msg);
      } catch (error) {
        console.error(error);
      }

      return NextResponse.json({res:true,id:order.OrderId},{status:201})
    }
    return NextResponse.json({res:false},{status:201})
}

export async function PUT(request){
  var {id,status} =  await request.json()
  if(id){
    var order = await Order.findOne({OrderId:id})
    var date = new Date()
    if(order){
      order.status=status
      const address = order.state + ", " + order.town + ", " + ", " + order.area + ", " + order.house + ", " + order.land

      var date = new Date(order.date);
      date.setDate(date.getDate() + 7);
      var cdate = new Date(order.date);

      var deliverDay = date.toLocaleString('en-US', { weekday: 'long' })
      var deliverMonth = date.toLocaleString('en-US', { month: 'long' })

      date = deliverDay + ", " + date.getDate() + " " + deliverMonth + " " + date.getFullYear()


      var Product = await Products.find({_id:order.productId})
      Product=Product[0]


      //CLIENT ORDER
      var msg = {
        to:order.email,
        from:process.env.EMAIL,
        template_id: 'd-016765037fe24258824b2e38bddcfeed',
        dynamic_template_data: {
          orderid:order.OrderId,
          name:order.fname,
          email: order.email,
          country:order.country,
          address:address,
          status:order.status,
          Ddate:date,
          date:cdate.getDate() + ", " +cdate.toLocaleString('en-US', { month: 'short' }) + " " + cdate.getFullYear(),
          pname:Product.productname,
          brand:Product.brand,
          year:Product.year,
          price:order.price,
          image:`<img alt="${Product.productname}" src="{{{${Product.image}}}}" width="104" height="104"/>`,
        },
      };
      try {
        await sendEmail(msg);
      } catch (error) {
        console.error(error);
      }

      order.new=0
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