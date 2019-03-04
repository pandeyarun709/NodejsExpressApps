var express     =   require("express");
var router      = express.Router();
var Campground  = require("../models/campground");


// Show all Campground
router.get("/" , (req , res)=>{ 
    
    //--------------- fetching campground from db
    Campground.find({} , function(err , allCampGrounds){
        
        if(err)
        {
            console.log(err);
        }else{
            res.render("campgrounds/index",{campGrounds : allCampGrounds});
        }
         
    });
});

// New Campground(form)
router.get("/new" , isLoggedIn , (req,res)=>{
    res.render("campgrounds/new");
     
});


// Create New Campground
router.post("/", (req,res)=>{
    
    var newCampground = {
        name : req.body.name,
        image : req.body.image,
        description: req.body.description
    };
    //---- creating new campground or inserting 
    Campground.create(newCampground ,function(err , newlyCreated){
        
        if(err){
            console.log(err);
        }else{
            //console.log("New Campground created");
            //console.log(newlyCreated); //just checking
            //------------- redirecting to camground page
            res.redirect("/campground");
        }
        
    });
   
});

// Show Campground Template
router.get("/:id" , (req, res)=>{
      
      Campground.findById(req.params.id).populate("comments").exec( (err, foundCampground)=>{
          if(err)
          {
              console.log(err);
          }else{
              res.render("campgrounds/show", { campground : foundCampground});
          }
          
      });
      
});

// Middleware check login or not
function isLoggedIn(req , res , next) {
    if(req.isAuthenticated()) {
        return next();  //it call next function in the call back
    }
    
    res.redirect("/login");
    
}

module.exports = router;