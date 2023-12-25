import mongoose from "mongoose";

const CourseSchema = mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true
      },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

const CourseModel = mongoose.model('course',CourseSchema)
export default CourseModel