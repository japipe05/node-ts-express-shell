import mongoose from "mongoose";
/**
 * level:LogSeverityLevel;//Enum
    message:string;
    origin:string;
    createdAt?: Date;
 */

    const userSchema = new mongoose.Schema({
        
        name:{
            type: String,
            required: [true,'Name is Required'],
        },
        email:{
            type: String,
            required: [true,'Email is Required'],
            unique: true,
        },
        emailValidated:{
            type: Boolean,
            default: false,
        },
        password:{
            type: String,
            required: [true,'Password is Required'],
        },
        img:{
            type: String,
        },
        role:{
            type: [String],
            default: ['USER_ROLE'],
            enum: ['ADMIN_ROLE','USER_ROLE'],
        },
    });

    export const userModel = mongoose.model('User',userSchema);