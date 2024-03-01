const mongoose=require("mongoose");
const {Schema}=mongoose.Schema;
const Review=require('./review.js');


const listeningShema= new mongoose.Schema({
     title:{
        type:String,
        required:true
     },
     description:{
        type:String
     },
     image:
     {
        url:String,
        filename:String
     },
     price:{
        type:Number
     },
     location:String,
     country:String,
     review:[
      {
          type:mongoose.Schema.Types.ObjectId,ref:"Review"
      }
     ],
    owner:
      {
          type:mongoose.Schema.Types.ObjectId,ref:'user'
      },
      geomentry:{
         type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
      }
});


listeningShema.post("findOneAndDelete",async(listing)=>{
    if (listing.review)
    { 
      await Review.deleteMany({_id:{$in:listing.review}});
      console.log("delete all reviews");
    }
})

module.exports=mongoose.model("Listenings",listeningShema);