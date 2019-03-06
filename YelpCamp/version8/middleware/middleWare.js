var Campground = require("../models/campground");
var Comment = require("../models/comment");

// Middle Ware checking owner ship for Campgrounds
function checkCampgroundOwnerShip(req ,res ,next) {
    
    // check user login or not
    if(req.isAuthenticated()){
         Campground.findById(req.params.id , function(err, foundCampground) {
               if (err) {
                   console.log(err);
                   res.redirect("back"); //redirect to back directory
                   
               } else {
                   //check autherisation
                   if(foundCampground.author.id.equals(req.user._id)){
                        next();
                   }
                   else {
                       res.redirect("back");
                   }
               }
         });
        
    } else {
        res.redirect("/login");
    }
}


//  Middle Ware checking owner ship for Comment
function checkCommentOwnerShip(req ,res ,next) {
    
    // check user login or not
    if(req.isAuthenticated()){
         Comment.findById(req.params.comment_id , function(err, foundComment) {
               if (err) {
                   console.log(err);
                   res.redirect("back"); //redirect to back directory
                   
               } else {
                   //check autherisation
                   if(foundComment.author.id.equals(req.user._id)){
                        next();
                   }
                   else {
                       res.redirect("back");
                   }
               }
         });
        
    } else {
        res.redirect("/login");
    }
}






// Middleware check login or not
function isLoggedIn(req , res , next) {
    if(req.isAuthenticated()) {
        return next();  //it call next function in the call back
    }
    
    res.redirect("/login");
    
}


module.exports = {
    isLoggedIn ,
    checkCampgroundOwnerShip , 
    checkCommentOwnerShip
};