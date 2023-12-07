import express from 'express';
import { authMiddleware } from '../Middleware/auth.js';
import { Edit, GetData, Login, Register } from '../Controller/userController.js';

import { upload } from '../Config/multerConfig.js';


const userRoute = express.Router()

userRoute.post('/register', upload.single('image'), Register);
userRoute.post('/login',Login)
userRoute.get('/getData',authMiddleware,GetData)
userRoute.patch('/edit',authMiddleware, upload.single('image'),Edit)

export default userRoute;