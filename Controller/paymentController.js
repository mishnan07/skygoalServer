
import razorpay from 'razorpay'
import dotenv from 'dotenv'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import userModel from '../Models/userModel.js'
import orderModel from '../Models/orderModel.js'

dotenv.config()
export const Order =  async(req,res)=>{
    try {
        const razorpay = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_SECRET,
        });
    
        const options = req.body;
        const order = await razorpay.orders.create(options);
    
        if (!order) {
          return res.status(500).send("Error");
        }
    
        res.json(order);
      } catch (err) {
        console.log(err);
        res.status(500).send("Error");
      }
}

export const Validate = async(req,res)=>{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature,amount,userId,chapterId } =
    req.body;
  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  const purchased = await userModel.updateOne(
    { _id: userId },
    { $addToSet: { PurchasedChapter: chapterId } }
  );

  const order = new orderModel({
    userId:userId,
    chapterId:chapterId
  })

  await order.save()
  
  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
}