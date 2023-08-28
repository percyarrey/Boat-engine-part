
import mongoose from 'mongoose';

const ProductsSchema = new mongoose.Schema({
  productname:{
    type : String,
    unique : true
  },
  brand:String,
  image:{
    img1:String,
    img2:String,
    img3:String,
    img4:String,
  },
  year:String,
  hp:Number,
  rating:Number,
  price:Number,
  description:String
});

const Products = mongoose.models.Products || mongoose.model('Products', ProductsSchema);

export default Products;