const {listingSchema}=require('./validation.js');
const {reviewSchema}=require('./validation.js');
const Listening=require("./models/listing.js");

module.exports.validationlistings=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if (error)
    {
     let err=error.details.map((el)=>el.message).join(',');
     throw new ExpressError(400,err);
    }
    else 
    {
     next();
    }
}

module.exports.Loggedin=(req,res,next)=>{
    if (!req.isAuthenticated())
    {
         req.session.redirectUrl=req.originalUrl;
         req.flash("error","You must Logged-in for add new Listings");
         res.redirect('/user/login');
        return;
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listening.findById(id);
    if(!listing.owner._id.equals(res.locals.currentUser._id))
    {
        req.flash("error","Don't have access");
        res.redirect('/listings');
        return;
    }
    next();
}

module.exports.validationreviews=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if (error)
    {
       let err=error.details.map((el)=>el.message).join(',');
       throw new ExpressError(400,err);
    }
    else 
    {
       next();
    }
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if (req.session.redirectUrl)
    {
       res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
  }