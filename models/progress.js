import mongoose,{Schema,model} from "mongoose";
import seeker from "./seekers.js"
import announcement from "./announcement.js";

const progressSchema=new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:seeker
    },
    ancId:{
        type:mongoose.Types.ObjectId,
        ref:announcement
    },
    Progress:{
        type:String
    },
    Date:{
        type:Date,
        default:Date.now
    }
})

const Progress=model('progress',progressSchema)
export default Progress