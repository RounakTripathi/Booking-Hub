import mongoose, { trusted } from 'mongoose';

const HotelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    distance:{
        type:String,
        required:true
    },
    photos:{
        type:[String]
    },
    description:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:0,
        max:5,
    },
    rooms:{
        type:[String],
    },
    cheapestPrice:{
        type:Number,
        required:trusted
    },
    featured:{
        type:Boolean,
        default:false
    }

});

export default mongoose.model("Hotel",HotelSchema);