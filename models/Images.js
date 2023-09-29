
import mongoose from 'mongoose';

const ImagesSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
    required: true
  },
  img2:String,
  img3:String,
  img4:String,
});

const Images = mongoose.models.Images || mongoose.model('Images', ImagesSchema);

export default Images;