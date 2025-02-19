import express, { urlencoded } from "express";
import CookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "10kb"}))
app.use(urlencoded({extended: true}))
app.use(CookieParser())

//routes import 
import userRouter from "./routes/user.routes.js";


//declare routes
app.use("/api/v2/users",userRouter)

export default app;