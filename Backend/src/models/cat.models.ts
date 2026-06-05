import mongoose from "mongoose";
import ICat from "../types/cats.types.ts";

let schema = new mongoose.Schema<ICat>({
    name:{
        type:String,
        required:true
    },
    breed:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    lifespan:{
        type:Number,
        default:1,
    },
    energylevel:{
        type:String,
        required:true
    },
    kidsfriendly:{
        type:Boolean,
        required:true
    },
    appartmentfriendly:{
        type:Boolean,
        required:true
    },
    

})