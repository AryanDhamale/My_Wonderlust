const express=require("express");
const router=express.Router({mergeParams:true});
const WrapAsync=require("../utils/Wrap.js");
const {validationlistings,Loggedin,isOwner}=require("../middleware.js");
const {index,newListingform,newListingadd,showListing,editListingform,editListingadd, destoryListing}=require('../controllers/listing.js');
const multer  = require('multer');
const {storage}=require('../cloudCloudinary.js');
const upload = multer({storage })


//INDEX ROOUTE///
router.get('/',WrapAsync(index));


// NEW Listing Add Route
router.get('/new',Loggedin,newListingform);
router.post('/',upload.single('listing[image]'),validationlistings,WrapAsync(newListingadd));

// Show Route
router.get('/:id',WrapAsync(showListing));

// Edit Route
router.get('/:id/edit',Loggedin,isOwner,WrapAsync(editListingform));
router.put('/:id',upload.single('listing[image]'),validationlistings,WrapAsync(editListingadd));

//Delete Route
router.delete('/:id',Loggedin,isOwner,WrapAsync(destoryListing))


module.exports=router;
