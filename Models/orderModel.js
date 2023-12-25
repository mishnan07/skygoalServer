import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
   
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true
      },
      chapterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chapter', 
        required: true
      },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

const orderModel = mongoose.model('order',orderSchema)
export default orderModel