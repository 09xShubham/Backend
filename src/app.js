import express, { urlencoded } from "express";
import CookieParser from "cookieparser";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// app.use(express.json({limit: "10kb"}))
// app.use(urlencoded({extended: true}))
// app.use(CookieParser())



export default app;