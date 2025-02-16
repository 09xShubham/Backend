import mongoose from 'mongoose';
import DB_NAME from '../constant.js';

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_CONNECT}/${DB_NAME}`);
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}
export default connectDB;

// We need to call this function again and again so we make a utility of this function so we can direct call this function from anywhere in our project. and we dont need to write this code again and again in varioous files.