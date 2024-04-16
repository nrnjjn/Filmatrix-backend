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
    },
    Feedback:{
        type:String,
    },
    Progress:{
        type:String,
        default:"No update"
    }
})

hiringreqSchema.pre('findOneAndDelete', async function (next) {
    try {
        const announcementId = this._conditions.ancId; // Get the ID of the announcement being deleted
        await this.model.deleteMany({ ancId: announcementId }); // Delete all hiring requests associated with the announcement
        next();
    } catch (error) {
        next(error);
    }
});


const Hiringrequest=model('hiringreq',hiringreqSchema)
export default Hiringrequest