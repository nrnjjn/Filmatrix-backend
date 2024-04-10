import mongoose, {Schema,model} from "mongoose"
import Seekers from "./seekers.js"
import Addlocation from "./addlocation.js"
import Payment from "./payment.js"
import Announcement from "./announcement.js"
import Locationreq from "./locationfcreq.js"

const postlocreqSchema = new Schema({
    hiringId:{
        type:mongoose.Types.ObjectId,
        ref:Seekers
    },
    locationId:{
        type:mongoose.Types.ObjectId,
        ref:Addlocation
    },
    paymentId:{
        type:mongoose.Types.ObjectId,
        ref:Payment
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
    }

})
const Locationbooking=model('locationbooking',postlocreqSchema)
export default Locationbooking;