import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    fname: String,
    email: String,
    OrderId:{
        type: String,
        default: function() {
          const length = 5;
          let result = '';
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          const charactersLength = characters.length;
    
          for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            result += characters.charAt(randomIndex);
          }
    
          var timestamp = Date.now().toString(36); // Append a timestamp to increase uniqueness
          timestamp = timestamp.slice(0,5)
          return result + timestamp;
        },
        unique: true // Ensure the generated OrderId is unique
    },
    country: String,
    num: String,
    pin: String,
    house: String,
    area: String,
    land: String,
    town: String,
    state: String,
    userId: String,
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    price: Number,
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Delivering', 'Delivered'],
        default: 'Pending'
    },
    new: {
        type: Number,
        default: 1
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;