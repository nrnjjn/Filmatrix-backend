import mongoose,{Schema,model} from "mongoose";
import seeker from "./seekers.js"
import announcement from "./announcement.js"

const hiringreqSchema=new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:seeker
    },
    ancId:{
        type:mongoose.Types.ObjectId,
        ref:announcement
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