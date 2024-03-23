import mongoose, {Schema,model} from "mongoose";
import seeker from './seekers.js'

const hiringfeedbackSchema=new Schema({
    hiringName:{
        type:String,
        required:true
    },
    filmName:{
        type:String,
        required:true
    },
    feedback:{
        type:String,
        required:true
    }
})

const Hiringfeedback = model('Hiringfeedback',hiringfeedbackSchema)
export default Hiringfeedback