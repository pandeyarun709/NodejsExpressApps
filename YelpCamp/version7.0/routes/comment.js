var express      = require("express");
var router       = express.Router({mergeParams : true});
var Campground   = require("../models/campground"); 
var Comment      = require("../models/comment");


// New Comment
router.get("/new" , isLoggedIn , function(req , res){
    
    Campground.findById(req.params.id , function(err , campground){
       
       if(err) {
           console.log(err);
       } else {
           res.render("comments/new" , {campground : campground});
       }
        
    });
});

//  Create New Comment
router.post("/" ,isLoggedIn, function(req, res){
    
    Comment.create(req.body.comments , function(err , comment){
       
        if (err) {
            console.log(err);
        } else {
           
            //finding campgroung
            Campground.findById(req.params.id , function(err , foundCampground){
                if(err) {
                    console.log(err);
                    res.redirect("/campground");
                    
                } else {
                    // add user name 
                       comment.author.username = req.user.username;
                       comment.author.id = req.user._id;
                    // save comment
                    comment.save();
                  //  console.log(comment);
                    //push comment
                    foundCampground.comments.push(comment); //save comments
                        //save campground                        
                        foundCampground.save();
                        
                        res.redirect("/campground/"+req.params.id);
                }
                
            });
            
        }
        
    });
    
});

// middleware check login
function isLoggedIn(req , res , next) {
    if(req.isAuthenticated()) {
        return next();  //it call next function in the call back
    }
    
    res.redirect("/login");
    
}


module.exports = router;