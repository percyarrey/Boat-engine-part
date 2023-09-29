import connectDB from "../../../utils/connectDB";
import Products from "../../../models/Products";
import Images from "../../../models/Images";
import {NextResponse } from "next/server";

export async function POST(request){
    var {productname,brand,image,year,hp,price,rating,description} = await request.json();
    await connectDB()
    const result = await Products.findOne({productname:productname})
    if(result){
        return NextResponse.json({message:"Product already exist"},{status:201})
    }else{
        var img = image
        image=image.img1
        var product = await Products.create({productname,brand,image,year,hp,rating,price,description})
        /* IMAGES */
        Images.create({
          productId:product._id,
          img2:img.img2,
          img3:img.img3,
          img4:img.img4,
        })
        return NextResponse.json({message:"Product created Succesfully",data:result},{status:201})
    }
}

export async function PUT(request){
    var {id,productname,brand,image,year,hp,price,rating,description} = await request.json();
    await connectDB()
    const product = await Products.findOne({_id:id})
    if (product) {
      var img = image
      image=image.img1
      //Update product
      const imageObject = await Images.findOne({productId:product._id})
      if(imageObject){
        imageObject.img2=img.img2;
        imageObject.img3=img.img3;
        imageObject.img4=img.img4;
        await imageObject.save()
      }
      // Update the properties of the product object
      product.productname = productname;
      product.brand = brand;
      product.image = image;
      product.year = year;
      product.hp = hp;
      product.price = price;
      product.rating = rating;
      product.description = description;
  
      // Save the updated product object
      const res = await product.save()
      if(res){
        return NextResponse.json({message: 'Product Successfully Updated',data:product},{status:201})
      }else{
        return NextResponse.json({message: 'Product upload Failed'},{status:201})
      }
    } else {
      return NextResponse.json({message: 'Product upload Failed'},{status:201})
    }

}

export async function GET(req){

}

export async function DELETE(req){
  const { searchParams } = new URL(req.url);
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
  }

}