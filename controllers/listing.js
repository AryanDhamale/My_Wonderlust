const Listening=require("../models/listing.js");
const User=require("../models/user.js");
const ExpressError=require("../utils/ExpressError.js");
const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxgeocoding({ accessToken: mapToken });

// Index Route
module.exports.index=async(req,res)=>{
    let allData=await Listening.find();
    if (!allData.length)
    throw new ExpressError(401,"No data Found");
    res.render('listening/listings.ejs',{allData});
}


// NEW Listing Add Route
module.exports.newListingform=(req,res)=>{
    res.render('listening/new.ejs');
 };

 module.exports.newListingadd=async(req,res,next)=>{
    let response=await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      }).send();
     // res.send("Done!!");
    const newListings = new Listening(req.body.listing);
    newListings.owner=req.user._id;
    let {url,public_id}=req.file;
    newListings.image={url,filename:public_id};
    newListings.geomentry=response.body.features[0].geometry;
   let result = await newListings.save();
    req.flash("success","New Listing Succesfully added");
    res.redirect('/listings');
 };


  // Show Route
  module.exports.showListing=async(req,res,next)=>{
    let {id}=req.params;
    const listing=await Listening.findById(id).populate('review');   //populate({path:"review",populate:{path:"author"}});
    const owner=await User.findById(listing.owner);
    if (!listing)
    {
        req.flash("error","The Listing you follow for does not exit");
        res.redirect('/listings');
        return;
    }
    //console.log(listing)
    res.render('listening/show.ejs',{listing,owner});
}


// Edit Route
module.exports.editListingform=async(req,res,next)=>{
    let {id}=req.params;
    let listing = await Listening.findById(id);
    if (!listing)
    {
        req.flash("error","The Listing you follow for does not exit");
        res.redirect('/listings');
        return;
    }
    let originalUrl=listing.image.url;
    originalUrl=originalUrl.replace('/upload','/upload/w_250');
    //console.log(originalUrl);
    res.render('listening/edit.ejs',{listing,originalUrl});
}

module.exports.editListingadd=async(req,res,next)=>{
   let {id}=req.params;
   let Editlisting=req.body.listing;
   let listing = await Listening.findByIdAndUpdate(id,Editlisting);
    if(req.file)
    {
        let {url,public_id}=req.file;
        listing.image={url,filename:public_id};
        await listing.save();
    }
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
}


//Delete Route
module.exports.destoryListing=async(req,res,next)=>{
    let {id}=req.params
        let deleted = await Listening.findByIdAndDelete(id);
        req.flash("success","Listing has deleted succesfully");
        res.redirect('/listings');
}