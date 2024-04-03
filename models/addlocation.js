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
    Image2:{
        type:String
    },
    Image3:{
        type:String
    },
    Description:{
        type:String,
    },
    Status:{
        type:String,
        default:'Pending'
    },
    Certificate:{
        type:String
    }
  
    
})
const Addlocation = model('location',addlocationSchema)
export default Addlocation