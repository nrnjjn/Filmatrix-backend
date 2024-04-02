import mongoose, {Schema,model} from "mongoose";
import Seekers from "./seekers.js";
import Addjob from "./addjob.js";

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
        type:String
    },
    Date:{
        type:Date,
        default:Date.now
    }
})

const jobrequest=model('Jobrequest',jobrequestSchema)
export default jobrequest