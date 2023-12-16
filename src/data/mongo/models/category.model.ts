import mongoose, { Schema } from "mongoose";
/**
 * level:LogSeverityLevel;//Enum
    message:string;
    origin:string;
    createdAt?: Date;
 */

    const categorySchema = new mongoose.Schema({
        
        name:{
            type: String,
            required: [true,'Name is Required'],
            unique: true
        },
        availabel:{
            type: Boolean,
            default: false,
        },
        user:{
            type: Schema.Types.ObjectId,
            ref:'User',
            require: true
        }
    });

    export const CategoryModel = mongoose.model('Category',categorySchema);