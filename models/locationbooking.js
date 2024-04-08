import mongoose, {Schema,model} from "mongoose"
import Seekers from "./seekers.js"
import Addlocation from "./addlocation.js"
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
    paymentId:{
        type:mongoose.Types.ObjectId,
        ref:Payment
    },
    bookingStatus:{
        type:String,
        default:'Pending'
    }
})
const Locationbooking=model('locationbooking',postlocreqSchema)
export default Locationbooking;