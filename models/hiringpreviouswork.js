import mongoose, {Schema,model} from "mongoose";
import seeker from "./seekers.js";

const hiringpreviousworkSchema=new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:seeker
    },
    Filmname:{
        type:String,
    },
    Genre:{
        type:String
    },
    Director:{
        type:String
    },
    Producer:{
        type:String
    },
    Productionhouse:{
        type:String
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

const Hiringpreviouswork=model('hiringpreviouswork',hiringpreviousworkSchema)
export default Hiringpreviouswork