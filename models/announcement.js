import mongoose, {Schema,model} from "mongoose";
import seeker from './seekers.js'

const announcementSchema=new Schema({
    companyId:{
        type:mongoose.Types.ObjectId,
        ref:seeker
    },
    Filmname:{
        type:String,
        required:true
    },
    Director:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    Image:{
        type:String
    },
    Date:{
        type:Date,
        default:Date.now
    },
    
})

const Announcement = model('announcement',announcementSchema);
export default Announcement