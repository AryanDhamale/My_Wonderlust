const express=require("express");
const route=express.Router({mergeParams:true});
const WrapAsync=require('../utils/Wrap.js');
const Review=require("../models/review.js");
const Listening=require("../models/listing.js");
const {validationreviews}=require("../middleware.js");



/// reviews route //
// post route //
route.post('/',validationreviews,WrapAsync(async(req,res)=>{
    let listing =  await Listening.findById(req.params.id);
    let review=new Review(req.body.review);
    listing.review.push(review);
    review.author=res.locals.currentUser._id;
    req.flash('success','review has added');
    await listing.save();
    await review.save();
    console.log("Date has saved");
    res.redirect(`/listings/${req.params.id}`);
}))

/// delete review //
route.delete('/:rid',async(req,res)=>{
   let{id,rid}=req.params;
   let review=await  Review.findById(rid);
   if (!res.locals.currentUser._id.equals(review.author._id))
   {
      req.flash("error","Don't have accesss");
      res.redirect(`/listings/${id}`);
      return ;
   }
   await Listening.findByIdAndUpdate(id,{$pull:{review:rid}});
   await Review.findByIdAndDelete(rid);
   req.flash("success","Review has deleted");
   res.redirect(`/listings/${id}`);
});

module.exports=route;