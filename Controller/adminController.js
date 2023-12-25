
import CourseModel from "../Models/courseModel.js";
import chapterModel from "../Models/chapterModel.js";
import userModel from "../Models/userModel.js";
import orderModel from "../Models/orderModel.js";

export const AddCourse = async(req,res)=>{
    console.log('kkkkkkk');
    const image=req.file.filename
    const {name,message,adminId} = req.body
    const course = new CourseModel({
        image:image,
        name:name,
        message:message,
        userId:adminId
    })
    const data = await course.save()
    res.status(200).json({message:'ok'})
    try {
        console.log(req.file.filename);
    } catch (error) {
        res.status(500).json({  message: 'Internal server error' });
    }
}

export const Courses = async(req,res)=>{
    try {
        const courses = await CourseModel.find({})
        res.status(200).json({courses})
    } catch (error) {
        res.status(500).json({  message: 'Internal server error' });
    }
}

export const AddChapter = async (req, res) => {
    try {
      const { selectedCourse, tittle, content,amount } = req.body;
  
      // Assuming CourseModel is your Mongoose model for courses
      const course = await CourseModel.findOne({ name: selectedCourse });
  
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      const chapter = new chapterModel({
        courseId: course._id,
        content: content,
        tittle: tittle,
        amount:amount
      });
  
      const data = await chapter.save();
  
      res.status(200).json({ message: 'ok' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  
export const GetAllUsers = async(req,res)=>{
  try {
      const users = await userModel.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


export const DeleteUser = async(req,res)=>{
  try {
    const userId = req.params.id;
    await userModel.findByIdAndDelete(userId);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


export const getOrders = async(req,res)=>{
  try {
    const orders = await orderModel.find({})
    .populate('userId')      // Populate the 'userId' field with details from the 'users' collection
    .populate('chapterId');  // Populate the 'chapterId' field with details from the 'chapters' collection

  console.log(orders);
  res.status(200).json({orders})
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });

  }
}