import mongoose, {Schema, model} from "mongoose";
import announcement from "./announcement.js";
import hiring from "./seekers.js"
const  addjobSchema=new Schema({
    ancId:{
        type:mongoose.Types.ObjectId,
        ref:announcement
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:hiring
    },
    Job:{
        type:String,
     
    },
    Vacancy:{
        type:Number,
        
    },
    Description:{
        type:String,
    },  category:{
        type:mongoose.Types.ObjectId,
    },
    Date:{
        type:Date,
        default:Date.now
    }
    


})

const Addjob=model('Addjob',addjobSchema)
export default Addjob