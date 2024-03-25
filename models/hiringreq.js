import mongoose,{Schema,model} from "mongoose";
import seeker from "./seekers.js"

const hiringreqSchema=new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:seeker
    },
    companyId:{
        type:mongoose.Types.ObjectId,
        ref:seeker
    },
    Date:{
        type:Date,
        default:Date.now
    },
    Status:{
        type:String,
        default:'Pending'
    },
    Description:{
        type:String,
    }
})

const Hiringrequest=model('hiringreq',hiringreqSchema)
export default Hiringrequest