var express     =   require("express");
var router      =   express.Router();
var Campground  =   require("../models/campground");
var middleWare  =   require("../middleware/middleWare");
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
router.get("/new" , middleWare.isLoggedIn , (req,res)=>{
    res.render("campgrounds/new");
     
});


// Create New Campground
router.post("/", middleWare.isLoggedIn , (req,res)=>{
    
    var author = {
        id : req.user._id,
        username : req.user.username
    };
    
    
    var newCampground = {
        name  :  req.body.name,
        image : req.body.image,
        description : req.body.description,
        author : author
    };
    //---- creating new campground or inserting 
    Campground.create(newCampground ,function(err , newCamp){
        
        if(err){
            console.log(err);
        }else{
            //console.log(newCamp);
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

//========================
// Edit , update , delete
// for Campgrounds
//========================

//Edit form
router.get("/:id/edit" , middleWare.checkCampgroundOwnerShip ,function(req ,res){
    
  Campground.findById(req.params.id , function(err , campground){
        if(err){
            console.log(err);
            res.redirect("/:id");
        }
        res.render("edit" , {campground :campground}); 
    });
    
});


router.put("/:id" , middleWare.checkCampgroundOwnerShip  , function(req ,res){

        Campground.findByIdAndUpdate(req.params.id , req.body.camp , (err , updateCamp)=>{
              if(err){
                  console.log(err);
                  res.redirect("/campground");
              }else {
                  res.redirect("/campground/" + req.params.id);
              }
           
       });
  
   
});

router.delete("/:id" , middleWare.checkCampgroundOwnerShip  ,function(req ,res){
    
   Campground.findByIdAndRemove( req.params.id , (err) =>{
       if(err) {
           console.log(err);
           res.redirect("back" );
       } else {
          res.redirect("/"); 
       }
   }); 
});




module.exports = router;