import mongoose, {Schema,model} from "mongoose"
import Seekers from "./seekers.js"
import Addlocation from "./addlocation.js"
import Announcement from "./announcement.js"
import Locationreq from "./locationfcreq.js"
import Payment from "./payment.js"

const postlocreqSchema = new Schema({
    hiringId:{
        type:mongoose.Types.ObjectId,
        ref:Seekers
    },
    locationId:{
        type:mongoose.Types.ObjectId,
        ref:Addlocation
    },
    paymentStatus:{
        type:String,
        default:'Pending'
   },

    bookingStatus:{
        type:String,
        default:'Pending'
    },

    ancId:{
        type:mongoose.Types.ObjectId,
        ref:Announcement
    },
    Date:{
        type:Date,
    },
    Noofdays:{
        type:String,
    },
    Fcreq:{
        type:mongoose.Types.ObjectId,
        ref:Locationreq
    },
    Feedback:{
        type:String,
        default:'No feedback'

    }

})

postlocreqSchema.pre('findOneAndDelete', async function (next) {
    try {
        const announcementId = this._conditions.ancId; // Get the ID of the announcement being deleted
        await this.model.deleteMany({ ancId: announcementId }); // Delete all location bookings associated with the announcement
        next();
    } catch (error) {
        next(error);
    }
});


const Locationbooking=model('locationbooking',postlocreqSchema)
export default Locationbooking;