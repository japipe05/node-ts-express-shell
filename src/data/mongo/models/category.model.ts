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
    categorySchema.set('toJSON',{
        virtuals:true, //cambia _id por id
        versionKey: false, // quita __V
        transform: function(doc, ret, options){
            delete ret._id; //Borra el _id que ya lo cambio
        }
    });
    export const CategoryModel = mongoose.model('Category',categorySchema);