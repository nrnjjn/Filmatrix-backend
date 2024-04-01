import mongoose, {Schema,model} from "mongoose";
import Seekers from "./seekers.js";
import Announcement from "./announcement.js";

const hiringfeedbackSchema=new Schema({
    hiringId:{
        type:mongoose.Types.ObjectId,
        ref:Seekers
    },
    ancId:{
        type:mongoose.Types.ObjectId,
        ref:Announcement
    },
    feedback:{
        type:String,
        required:true
    }
})

const Hiringfeedback = model('Hiringfeedback',hiringfeedbackSchema)
export default Hiringfeedback