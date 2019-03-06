var express      = require("express");
var router       = express.Router({mergeParams : true});
var Campground   = require("../models/campground"); 
var Comment      = require("../models/comment");
var middleWare   = require("../middleware/middleWare");

// New Comment
router.get("/new" , middleWare.isLoggedIn , function(req , res){
    
    Campground.findById(req.params.id , function(err , campground){
       
       if(err) {
           console.log(err);
       } else {
           res.render("comments/new" , {campground : campground});
       }
        
    });
});

//  Create New Comment
router.post("/" ,middleWare.isLoggedIn, function(req, res){
    
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

//========================================
//    Delete Edit 
//    Comments
//========================================

//edit route or update route/ render form Comments
router.get("/:comment_id/edit" , middleWare.checkCommentOwnerShip , function(req , res) {
   Comment.findById(req.params.comment_id , function(err, foundComment) {
       if(err) {
           console.log(err);
           res.redirect("back");
       }
       res.render("comments/edit" , {campground_id : req.params.id , comment :foundComment });
   }); 
    
});

// update route Comment
router.put("/:comment_id" ,middleWare.checkCommentOwnerShip ,  function(req, res) {
   
   Comment.findByIdAndUpdate(req.params.comment_id , req.body.comment , function(err , updateComment){
           
           console.log(req.body.updateComment);
           if( err ) {
               console.log(err);
               res.redirect("back");
           } else {
               
               res.redirect("/campground/" + req.params.id);
           }
   }) ;
});


// Delete Route 
router.delete("/:comment_id" , middleWare.checkCommentOwnerShip, function(req ,res) {
    
    Comment.findByIdAndRemove(req.params.comment_id , function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campground/"+req.params.id);
        }
    });
});








module.exports = router;