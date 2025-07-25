import mongoose from "mongoose";

export const DB =  mongoose.connect(process.env.DB_URI).then(()=>{
    console.log('connected')
})
