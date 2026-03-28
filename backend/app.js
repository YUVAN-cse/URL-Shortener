import express from 'express';
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })
const app = express()
import urlRouter from "./routes/url.route.js"
import connectDb from "./config/mongo.config.js"
import ErrorClass from './utilis/ErrorClass.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
app.use(cookieParser());


app.use(cors({
  origin: 'http://localhost:5173', // your frontend origin
  credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/test" , (req,res)=>{
  throw new ErrorClass(400 , "This error class is working")
})


app.use("/" , urlRouter)

// filepath: c:\Users\DELL\Desktop\URL_SHORT\backend\app.js
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error"
  });
});


app.listen(3000, () => {
  connectDb().catch(err => console.log(err));
  console.log("Server is running on port 3000")
})