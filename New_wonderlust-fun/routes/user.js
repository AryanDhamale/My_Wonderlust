const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const Wrapasync=require("../utils/Wrap.js");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");




router.route('/sign-in')
.get((req,res)=>{
   res.render("user/sign.ejs")})
.post(Wrapasync(async(req,res)=>{
       try
       {
         let {username,password,email}=req.body;
         const user=new User({username,email});
         let registerUser = await User.register(user,password);
         console.log(registerUser);
         req.login(registerUser,(err)=>{
             if (err)
             {
              next(err);
             }else
             {
              req.flash("success","Wellcome to Wonderlust");
              res.redirect('/listings');
             }
         })
         return;
       }catch(err)
       {
         req.flash("error",err.message);
         res.redirect('/user/sign-in');
       }
}));


router.route('/login')
.get((req,res)=>{
   res.render("user/login.ejs");
})
.post(saveRedirectUrl,passport.authenticate('local',{failureRedirect:'/user/login',failureFlash:true}),(req,res)=>{
    req.flash("success","Wellcome To Wonderlust");
    if (res.locals.redirectUrl)
    {
      res.redirect(res.locals.redirectUrl);
    }
    else
    {
      res.redirect("/listings");
    }
})

router.get('/logout',(req,res,next)=>{
    req.logout((err)=>{
      if (err)
      {
        next(err);
      }
      else
      {
         req.flash("success","You Logged out !");
         res.redirect('/listings');
      }
    })
})


router.get('/account',(req,res)=>{
   res.render('user/account.ejs');
});
module.exports=router;