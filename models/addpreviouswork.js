import mongoose, {Schema,model} from "mongoose";

const previousworkSchema=new Schema({
    Job:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Image:{
        type:String
    },
    Fromdate:{
        type:Date,
        required:true
    },
    Todate:{
        type:Date,
        required:true
    },
    seekerId:{
        type:String
    }
})

const Addpreviouswork=model('previouswork',previousworkSchema)
export default Addpreviouswork