const mongoose=require('mongoose')
const productSchema=mongoose.Schema({
     title:{
        type: String,
        unique:true,
        require:true,
     },
     price:{
         type:Number,
         require:true,
     },
     description:String,
     images:[String],
     createdAt:{
         type:Date,
         default:new Date(),
     },
     updatedAt:{
        type:Date,
        default:new Date(),
    }
})
const productModel=mongoose.model('Products',productSchema);
module.exports=productModel;