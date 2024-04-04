import mongoose, {Schema,model} from "mongoose";
import Seekers from "./seekers.js";
import Addjob from "./addjob.js";
import Announcement from "./announcement.js";

const jobrequestSchema=new Schema({
    sId:{
        type:mongoose.Types.ObjectId,
        ref:Seekers
    },
    jobId:{
        type:mongoose.Types.ObjectId,
        ref:Addjob
    },
    Status:{
        type:String,
        default:'Pending'
    },
    Date:{
        type:Date,
        default:Date.now
    },
    Cv:{
        type:String
    },
    Description:{
        type:String
    },
    ancId:{
        type:mongoose.Types.ObjectId,
        ref:Announcement
    }
})

const jobrequest=model('Jobrequest',jobrequestSchema)
export default jobrequest