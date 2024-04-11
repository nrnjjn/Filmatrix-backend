import mongoose, {Schema,model} from "mongoose";

const categorySchema=new Schema({
    name:{
        type:String
    },
   
    
})

const category = model('category',categorySchema);
export default category