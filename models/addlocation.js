import mongoose,{Schema,model} from "mongoose";
import seeker from './seekers.js'

const addlocationSchema=new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:seeker
    },
    locationName:{
        type:String,
    },
    Image:{
        type:String
    },
    Description:{
        type:String,
    }
  
    
})
const Addlocation = model('location',addlocationSchema)
export default Addlocation