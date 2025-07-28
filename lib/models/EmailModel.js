import mongoose from "mongoose";

const schema =  mongoose.Schema({

    email:{
        type: String,
        required: true
    }, 
    date:{
        type:Date,
        default:Date.now()
    }
})

const Email = mongoose.models.Email || mongoose.model('Email', schema)


export default Email