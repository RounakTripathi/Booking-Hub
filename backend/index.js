import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import auth from "./routes/auth.js";
import hotels from "./routes/hotels.js";
import users from "./routes/users.js";
import rooms from "./routes/rooms.js";
import cookieParser from "cookie-parser";
const app = express();
import cors from "cors";

app.use(cors({
    origin: "http://localhost:3000", // Allow frontend requests
    credentials: true, // Allow cookies & authentication headers
}));
dotenv.config();

const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongoDB");
      } catch (error) {
        throw error;
      }
      
};
 
mongoose.connection.on("disconnected" ,()=>{
    console.log("mongoDB disconnected");
})
mongoose.connection.on("connected",()=>{
    console.log("mongoDB connected");
})

// app.get("/users" ,(req,res)=>{
//     res.end("hello from first request !!");
// })
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",auth);
app.use("/api/hotels",hotels);
app.use("/api/rooms",rooms);
app.use("/api/users",users);

// app.use((err,req,res,next)=>{
//     const errorStatus = err.status || 500;
//     const errorMessage = err.message || "Something Went Wrong";    
//     return res.status(errorStatus).json({
//       success:false,
//       status:errorStatus,
//       message:errorMessage,
//       stack:err.stack
//     });
// })

app.listen(5050,()=> {
connect();
console.log("connected to backend")}); 