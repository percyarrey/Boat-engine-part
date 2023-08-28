import connectDB from "@/utils/connectDB";
import Products from "@/models/Products";
import {NextResponse } from "next/server";

export async function POST(request){
    const {productname,brand,image,year,hp,price,rating,description} = await request.json();
    await connectDB()
    const result = await Products.findOne({productname:productname})
    if(result){
        return NextResponse.json({message:"Product already exist"},{status:201})
    }else{
        Products.create({productname,brand,image,year,hp,rating,price,description})
        return NextResponse.json({message:"Product created Succesfully",data:result},{status:201})
    }
}

export async function PUT(request){
    const {id,productname,brand,image,year,hp,price,rating,description} = await request.json();
    await connectDB()
    const product = await Products.findOne({_id:id})
    if (product) {
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
    const { searchParams } = new URL(req.url);
    var query = searchParams.get("query");
    /* var prop = query?.slice(0,1);
    query  = query?.slice(2,query.length); */
    await connectDB()
    var data;
   /*  if(prop==='s'){
      data = await Products.find({productname:{$regex:query,$options:'i'}})
      if(!data){
        return NextResponse.json({data:'Nothing found'},{status:201})
      }
    }else if(prop==='c'){
      data = await Products.find({brand:{$regex:query,$options:'i'}})

      if(!data){
        return NextResponse.json({data:'Nothing found'},{status:201})
      }
    }else{ */
    data = await Products.find({}).limit(20);
    /* } */
    return NextResponse.json({data:data},{status:201})

    
}

export async function DELETE(req){
  const { searchParams } = new URL(req.url);
  var id = searchParams.get("id");
  await connectDB()
  const product = await Products.findOne({_id:id})
  if (product) {
    // Delete the Product
    const res = await Products.deleteOne({_id:product._id})
    console.log(res)
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