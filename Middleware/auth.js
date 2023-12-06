import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secreteKey = process.env.SECRET_KEY;


export const generateAuthToken = (user)=>{

   const payload = {
     _id:user._id,
     name:user.name,
     email:user.email,
   }
   const token = jwt.sign({payload},secreteKey) 
   return token
}


export const authMiddleware = (req, res, next) => {

  let token = req.header('Authorization');
  try {
    if (!token) return res.status(404).json({ message: 'Authorization Failed: no token provided' });

    if (token.startsWith('Bearer ')) {
      token = token.slice(7,token.length).trimLeft(); 
   
      const verified = jwt.verify(token,secreteKey);
      req.user = verified;
    }
   
    next();
  } catch (error) {
    return res.status(404).json({ message: 'Authorization Failed: invalid token' });
  }
};
