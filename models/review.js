const mongoose=require("mongoose");

const reviewShema = new mongoose.Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    createdAt:{
         type:Date,
         default:Date.now()
    },
    author:{
         type:mongoose.Schema.Types.ObjectId,ref:"user"
    }
})

const Review = mongoose.model("Review",reviewShema);
module.exports=Review;
