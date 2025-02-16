// import mongoose from "mongoose";
// import DB_NAME from "../constants.js";

import 'dotenv/config';
import connectDB from "./db/db.js";
import app from './app.js';


connectDB()
.then(() => {

    app.on('error',(error) => {
        console.log(`Error: ${error.message}`);
    })

    app.listen(process.env.PORt||8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log(`Error: ${error.message}`);
})


// import express from "express";

// const app = express();

// (async() => {
//     try {
//         mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         console.log(`MongoDB connected: ${mongoose.connection.host}`);
//         app.on('error',(error) => {
//             console.log(`Error: ${error.message}`);
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`);
//         })

//     } catch (error) {
//         console.log(`Error: ${error.message}`);
//     }
// })()