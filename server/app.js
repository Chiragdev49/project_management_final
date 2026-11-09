import express, { urlencoded } from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import authRouter from "./routes/userRoutes.js"
import adminRouter from "./routes/adminRoutes.js"
import studentRouter from "./routes/studentRoutes.js"
import notificationRouter from "./routes/notificationRoutes.js"
import projectRouter from "./routes/projectRoutes.js"
import deadlineRouter from "./routes/deadlineRoutes.js"
import teacherRouter from "./routes/teacherRoutes.js"
import {fileURLToPath} from "url";
import path from "path";
import fs from "fs";
// import { connectDB } from "./config/db.js";

config();

const __filename =fileURLToPath(import.meta.url);
const __dirname =path.dirname(__filename);

const app=express();

//middlewares-------------------
app.use(
    cors({
        origin:[process.env.FRONTEND_URL],
        methods:["GET","POST","PUT","DELETE"],
        credentials:true,
    })
)

const uploadDir =path.join(__dirname,"upload");
const tempDir =path.join(__dirname,"temp");

if(!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir,{recursive:true});
if(!fs.existsSync(tempDir)) fs.mkdirSync(tempDir,{recursive:true});


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api/v1/auth",authRouter)
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/student",studentRouter)
app.use("/api/v1/notification",notificationRouter)
app.use("/api/v1/project",projectRouter)
app.use("/api/v1/deadline",deadlineRouter)
app.use("/api/v1/teacher",teacherRouter)

app.use(errorMiddleware);

export default app;