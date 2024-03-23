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
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    }
})

const Addjob=model('Addjob',addjobSchema)
export default Addjob