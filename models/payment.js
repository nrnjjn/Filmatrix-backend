import mongoose, {Schema,model} from "mongoose";
import Seekers from "./seekers.js";

const paymentSchema=new Schema({
    hiringId:{
        type:mongoose.Types.ObjectId,
        ref:Seekers
    },
    locationownerId:{
        type:mongoose.Types.ObjectId,
        ref:Seekers
    },
    Amount:{
        type:String
    },
    Status:{
        type:String,
        default:'Pending'
    }
})

const Payment=model('payment',paymentSchema)
export default Payment