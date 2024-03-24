import mongoose, {Schema,model} from "mongoose";
import seeker from "./seekers.js";

const previousworkSchema=new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:seeker
    },
    Job:{
        type:String,
       
    },
    Description:{
        type:String,
    },
    Image:{
        type:String
    },
    Fromdate:{
        type:Date,
    },
    Todate:{
        type:Date,
    },
    
})

const Addpreviouswork=model('previouswork',previousworkSchema)
export default Addpreviouswork