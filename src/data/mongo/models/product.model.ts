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
        available:{
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
    producSchema.set('toJSON',{
        virtuals:true,
        versionKey: false,
        transform: function(doc, ret, options){
            delete ret._id;
        }
    });
    export const ProducModel = mongoose.model('Product',producSchema);