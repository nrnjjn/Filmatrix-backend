import mongoose, {Schema,model} from "mongoose"
import announcement from './announcement.js'
import hiring from './seekers.js'
import location from './addlocation.js'

const locreqSchema = new Schema({
    Filmname:{
        type:mongoose.Types.ObjectId,
        ref:announcement
    },
    hiringId:{
        type:mongoose.Types.ObjectId,
        ref:hiring
    },
    locationId:{
        type:mongoose.Types.ObjectId,
        ref:location
    },
    Status:{
        type:String,
        default:'Pending'
    },
    Date:{
        type:Date,
        
    },
    Noofdays:{
        type:Number
    },
    total:{
        type:Number,
        default:0
    }
})

locreqSchema.pre('findOneAndDelete', async function (next) {
    try {
        const announcementId = this._conditions.Filmname; // Get the ID of the announcement being deleted
        await this.model.deleteMany({ Filmname: announcementId }); // Delete all location requests associated with the announcement
        next();
    } catch (error) {
        next(error);
    }
});


const Locationreq=model('locreq',locreqSchema)
export default Locationreq