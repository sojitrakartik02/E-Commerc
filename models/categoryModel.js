import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        // require:true,
        // unique:true,
    },
    slug:{
        type:String,
        lowercase:true,
    }
})


const categoryModel=mongoose.model("Category",categorySchema);
export default categoryModel;   