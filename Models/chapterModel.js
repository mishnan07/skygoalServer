import mongoose from "mongoose";

const chapterSchema =mongoose.Schema ({
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course', 
        required: true
    },
    tittle:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

const chapterModel = mongoose.model('chapter',chapterSchema)
export default chapterModel