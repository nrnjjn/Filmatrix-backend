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

const Locationreq=model('locreq',locreqSchema)
export default Locationreq