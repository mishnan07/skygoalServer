import bcrypt from 'bcrypt';
import userModel from '../Models/userModel.js';
import { generateAuthToken } from '../Middleware/auth.js';


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
      const { email, password } = userDetails;
  
      const findUser = await userModel.findOne({ email });
  
      if (!findUser) {
        return res.status(200).json({ state: false, mess: 'User not found' });
      }
  
      if (password) {
        const isPasswordMatch = await bcrypt.compare(password, findUser.password);
  
        if (!isPasswordMatch) {
          return res
            .status(200)
            .json({ state: false, mess: 'Email or password is incorrect' });
        }
  
        const token = generateAuthToken(findUser);
        const { name } = findUser;
  
        const userResponse = {
          id: findUser._id,
          status: true,
          token,
          name,
        };
  
        return res.status(200).json({ userResponse });
      } else {
        return res.json({ state: false, mess: 'Password is required' });
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