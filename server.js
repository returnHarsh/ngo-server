import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ConnectDB } from "./utils/connectDB.js";
import {router as Router} from "./routes/route.js";
import {v2 as cloudinary} from "cloudinary";
import path from "path";
import { fileURLToPath } from 'url';

// Convert import.meta.url to a file path
const __dirname = path.resolve();

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors({
    origin : ["http://localhost:3000" , "http://localhost:3001"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials : true
}))

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());

ConnectDB();

// setting up cloudinary
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY ,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})

app.use("/api" , Router);


app.use(express.static(path.join(__dirname , "/frontend/build")));
// app.get("*", function(_, res) { 
 
//   try{
//     res.sendFile(path.join(__dirname , "/frontend" , "/build" , "/index.html"));
//   }catch(err){
//     console.log(err.message);
//   }
//   });


  

app.listen(PORT , ()=>{
    console.log("server online");
})
