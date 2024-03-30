import  {Schema,model} from "mongoose";

const seekersSchema = new Schema({
    Name:{
        type:String,
    },
    Email:{
        type:String,
        required:true
    },
    Phone:{
        type:Number,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    Idproof:{
        type:String
    },
    Gender:{
        type:String
    },
    Password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    companyName:{
        type:String
    },
    Liscence:{
        type:String
    },
    liscenceNo:{
        type:String
    },
    userType:{
        type:String
    },
    Status:{
        type:String,
        default:'pending'
    }
})
 const Seekers=model('Seekers', seekersSchema)
 export default Seekers