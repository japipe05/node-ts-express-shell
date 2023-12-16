import mongoose, { Schema } from "mongoose";
/**
 * level:LogSeverityLevel;//Enum
    message:string;
    origin:string;
    createdAt?: Date;
 */

    const producSchema = new mongoose.Schema({
        
        name:{
            type: String,
            required: [true,'Name is Required'],
            unique: true,
        },
        avauilable:{
            type: Boolean,
            default: false,
        },
        price:{
            type: Number,
            default:0,
        },
        description:{
            type: String,
        },
        user:{
            type: Schema.Types.ObjectId,
            ref:'User',
            require:true,
        },
        category:{
            type: Schema.Types.ObjectId,
            ref: 'Category',
            require:true,
        }

    });

    export const ProducModel = mongoose.model('Product',producSchema);