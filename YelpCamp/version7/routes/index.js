var express        =   require("express");
var User           = require("../models/user"), 
    router         =   express.Router(),
    mongoose       =   require("mongoose"),
    passport       =   require("passport"),
    LocalStrategy  =   require("passport-local");


// Root route
router.get("/" , function(req ,res){
    res.redirect("/campground"); 
});

// Register Routes
router.get("/register" , function(req, res) {
     res.render("register"); 
});

// CreateUser/User Register Route
router.post("/register" , function(req, res) {
   var newUser = new User({username :req.body.username});
   var password = req.body.password;
   
   User.register(newUser , password , function(err ,user){
       if(err){
           console.log(err);
           res.redirect("/register");
       }
       
       passport.authenticate("local")(req, res ,function(){
           res.redirect("/campground");
       })
   }); 
});

//  Login Route
router.get("/login" , function(req, res) {
    res.render("login"); 
});

// Check authentication Login
router.post("/login" ,passport.authenticate("local" , {
    successRedirect :"/campground" , 
        failureRedirect : "/login"
    }), function(req, res) {
       
});

// Logout Route
router.get("/logout" , function(req, res) {
   req.logout();
   res.redirect("/campground");
});

function isLoggedIn(req , res , next) {
    if(req.isAuthenticated()) {
        return next();  //it call next function in the call back
    }
    
    res.redirect("/login");
    
}

module.exports = router;