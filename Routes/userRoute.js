import express from 'express';
import { authMiddleware } from '../Middleware/auth.js';
import { Edit, GetData, Login, Register, getSelectedCourses, userPurchased } from '../Controller/userController.js';

import { upload } from '../Config/multerConfig.js';
import { Order, Validate } from '../Controller/paymentController.js';




const userRoute = express.Router()

userRoute.post('/register', upload.single('image'), Register);
userRoute.post('/login',Login)
userRoute.get('/getData',authMiddleware,GetData)
userRoute.patch('/edit',authMiddleware, upload.single('image'),Edit)
userRoute.get('/getSelectedCourses/:courseId',getSelectedCourses)

userRoute.post('/order',Order)
userRoute.post('/order/validate',Validate)
userRoute.get('/userPurchased/:userId',userPurchased)
export default userRoute;