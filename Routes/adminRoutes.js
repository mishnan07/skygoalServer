import express from 'express';
import { authMiddleware } from '../Middleware/auth.js';

import { upload } from '../Config/multerConfig.js';
import { AddChapter, AddCourse, Courses, DeleteUser, GetAllUsers, getOrders } from '../Controller/adminController.js';


const adminRoute = express.Router()

adminRoute.post('/addCourse',authMiddleware, upload.single('image'), AddCourse);
adminRoute.get('/courses',authMiddleware,Courses)
adminRoute.post('/addChapter',authMiddleware,AddChapter)
adminRoute.get('/getAllUsers',authMiddleware,GetAllUsers)
adminRoute.delete('/deleteUser/:id',authMiddleware,DeleteUser)
adminRoute.get('/getOrders',authMiddleware,getOrders)


export default adminRoute;