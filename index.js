import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'


import userRoute from './Routes/userRoute.js'

const app = express()
app.use(express.json({limit:'30mb',extended:true}))
app.use(morgan('dev'))
app.use(express.urlencoded({limit:'30mb',extended:true}))
app.use(cors())
app.use(express.static('public'))
dotenv.config()


app.use('/',userRoute)


const port = process.env.PORT;
const databaseUrl = process.env.DATABASE_URL;

mongoose.connect(databaseUrl,{
}).then(()=>{
  app.listen(port,()=>{
  console.log(`express app listening on port${port}` );
})
}).catch((error)=>{console.log(`${error} did not connect`);})

