import mongoose, {Schema, model} from "mongoose";


const  addjobSchema=new Schema({
    Job:{
        type:String,
        required:true
    },
    filmName:{
        type:String,
        required:true
    },
    Vacancy:{
        type:Number,
        required:true
    },
    Description:{
        type:String,
        required:true
    }
})

const Addjob=model('Addjob',addjobSchema)
export default Addjob