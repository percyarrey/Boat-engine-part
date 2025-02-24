import connectDB from "../../../utils/connectDB";
import Brand from "../../../models/brand";
import {NextResponse } from "next/server";
import Products from "../../../models/Products";

export async function GET(){
  await connectDB()
  const brand = await Brand.find({})
  return NextResponse.json({data:brand},{status:201})
}


export async function POST(request){
    var {name} = await request.json();
    await connectDB()
    const result = await Brand.findOne({name:name})
    if(result){
        return NextResponse.json({message:0},{status:201})
    }else{
        var brand = await Brand.create({name})
        if(brand){
          return NextResponse.json({message:1},{status:201})
        }
        return NextResponse.json({message:3},{status:201})

    }
}

export async function PUT(request){
    var {name,id} = await request.json();
    await connectDB()
    const brand = await Brand.findOne({_id:id})
    if (brand) {
      //Update brand
      brand.name =name;
  
      // Save the updated product object
      const res = await brand.save()
      if(res){
        return NextResponse.json({message:1},{status:201})
      }else{
        return NextResponse.json({message: 3},{status:201})
      }
    } else {
      return NextResponse.json({message: 3},{status:201})
    }

}


export async function DELETE(req){
  const { searchParams } = new URL(req.url);
  var id = searchParams.get("id");
  await connectDB()
  const brand = await Brand.findOne({_id:id})
  
  if (brand) {
    // Delete the Product
    const res = await brand.deleteOne({_id:brand._id})
    await Products.deleteMany({brand:brand.name})
    // run check
    if(res){
      return NextResponse.json({message: 1},{status:201})
    }else{
      return NextResponse.json({message: 3},{status:201})
    }
  } else {
    return NextResponse.json({message:3},{status:201})
  }

}