import bcrypt from 'bcrypt';
import userModel from '../Models/userModel.js';
import { generateAuthToken } from '../Middleware/auth.js';
import chapterModel from '../Models/chapterModel.js';
import orderModel from '../Models/orderModel.js';


export const Register = async (req, res) => {
    try {
      let userDetails = req.body;
      const image = req.file ? req.file.filename : '';
 
        const user = await userModel.find({ email: userDetails.email });
  
      if (user.length === 0) {
        userDetails.password = await bcrypt.hash(userDetails.password, 10);
        await userModel.create({
          name: userDetails.name,
          email: userDetails.email,
          password: userDetails.password,
          profileImage: image,
          isAdmin:userDetails.userType==='user'?false:true
        });
  
        res.status(200).json({ status: true, result: userDetails });
      } else {
        return res.json({ status: false, mes: 'User already exists' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, mes: 'Internal server error' });
    }
  };
  



  export const Login = async (req, res) => {
    try {
      const userDetails = req.body;
      const { email, password,userType } = userDetails;
  
      const findUser = await userModel.findOne({ email });
  
      if (!findUser) {
        return res.status(404).json({  mess: 'User not found' });
      }
  
      if (password) {
        const isPasswordMatch = await bcrypt.compare(password, findUser.password);
  
        if (!isPasswordMatch) {
          return res.status(401).json({  mess: 'Email or password is incorrect' });

        }
  
        const token = generateAuthToken(findUser);

        const { name } = findUser;
  
        const userResponse = {
          id: findUser._id,
          status: true,
          token,
          name,
          userType:userType
        };
  
        return res.status(200).json({ userResponse });
      } else {
        return res.json({  mess: 'Password is required' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'failed', message: error.message });
    }
  };
  
  
  
export const GetData = async(req,res)=>{

    try {
        const userId = req.query.id;
        const user = await userModel.findOne({_id:userId})
        res.status(200).json({user})

    } catch (error) {
        return res.status(500).json({ status: 'failed', message: error.message });

    }
}


export const Edit = async (req, res) => {
  try {
    const userDetails = req.body;
    let image = req.file  ? req.file.filename : '';
 if(!image && userDetails.image){
  image = userDetails.image
 }

    const user = await userModel.findOne({ email: userDetails.email });

    if (!user) {
      return res.status(404).json({ status: false, mes: 'User not found' });
    }

    const response = await userModel.findByIdAndUpdate(
      user._id,
      {
        $set: {
          name: userDetails.name,
          email: userDetails.email,
          profileImage: image || null,
        },
      },
      { new: true } 
    );

    res.status(200).json({ status: true, result: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, mes: 'Internal server error' });
  }
};


export const getSelectedCourses = async (req, res) => {
  try {
    const courseId = req.params.courseId; // Use const or let to declare courseId
    const chapters = await chapterModel.find({ courseId: courseId });
   
    res.status(200).json({ chapters });
  } catch (error) {
    res.status(500).json({ status: false, mes: 'Internal server error' });
  }
};


export const userPurchased = async (req,res)=>{
  try {
    const userId = req.params.userId
    const user = await userModel.findOne({ _id: userId });

    if (user.PurchasedChapter) {
      const purchasedChaptersIds = user.PurchasedChapter;
      return res.status(200).json({purchasedChaptersIds})
    }  
     res.status(200).json({mes:'User not Purchased Chapters'})

  } catch (error) {
    res.status(500).json({ status: false, mes: 'Internal server error' });
  }
}

