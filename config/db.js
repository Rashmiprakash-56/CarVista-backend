import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config(); 

const connectdb = async ()=>{
    try{
         await mongoose.connect(process.env.MONGODB_URL)
         .then(() => console.log("MongoDB connected"))
         .catch((err) => console.log("Error occured",err))
    } catch(err) {
        console.log(err);
        process.exit(1)
    }
}

export default connectdb;