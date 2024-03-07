require('dotenv').config();
const express=require("express");
const app=express();
const port=8080;
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require('ejs-mate');
const listingRoute=require("./routes/listing.js");
const reviewRoute=require("./routes/review.js");
const UserRoute=require("./routes/user.js");
const ExpresError=require("./utils/ExpressError.js");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const dataBaseUrl=process.env.ATLAS_URL;
const flash=require("connect-flash");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const localUrl='mongodb://127.0.0.1:27017/wonderlust';

app.use(express.static(path.join(__dirname,'/public')));
app.engine('ejs',ejsMate);
app.use(methodOverride("_method"));
app.set('views engin','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));



async function main()
{
    await mongoose.connect(localUrl);
}
main().then((res)=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
});

// const store=MongoStore.create({
//     mongoUrl: dataBaseUrl,
//     crypto: {
//         secret: process.env.SALT,
//     },
//     touchAfter:24*3600,
//   });

app.listen(port,()=>{
    console.log(`listening at port no.${port}`);
});

const sessionOptions = {
    //store,
    secret:process.env.SALT,
    resave:false,
    saveUninitialized:true,
    cookie:{
         expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
         maxAge:7 * 24 * 60 * 60 * 1000,
         httpOnly:true
    }
}




app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currentUser=req.user;
    next();
 })


// Home Route
app.get('/',(req,res)=>{
    res.redirect('/listings');
})

app.use('/listings',listingRoute);
app.use('/listings/:id/review',reviewRoute);
app.use('/user',UserRoute);


// page Not found //
app.all('*',(req,res,next)=>{
    next(new ExpresError(401,"Page Not Found"));
})
// Error Handling //
app.use((err,req,res,next)=>{
   let {status=401,message="page not found"}=err;
   res.render('listening/Error.ejs',{message});
})