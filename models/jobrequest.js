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

jobrequestSchema.pre('findOneAndDelete', async function (next) {
    try {
        const announcementId = this._conditions.ancId; // Get the ID of the announcement being deleted
        await this.model.deleteMany({ ancId: announcementId }); // Delete all job requests associated with the announcement
        next();
    } catch (error) {
        next(error);
    }
});


const jobrequest=model('Jobrequest',jobrequestSchema)
export default jobrequest