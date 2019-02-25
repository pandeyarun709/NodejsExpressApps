
var express     =   require("express"),
    app         =   express(),
    bodyParser  =   require("body-parser"),
    mongoose    =   require("mongoose"),
    Campground  =   require("./models/campground"),
    seedDB      =   require("./seeds"),
    Comment     =   require("./models/comment");

mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine" , "ejs");
app.use(express.static(__dirname+"/public"));

seedDB();


/***** INDEX ********************* main landing page *******************************************/
app.get("/" , (req,res)=>{
   res.redirect("/campground"); 
});


app.get("/campground" , (req , res)=>{
    
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

/****** NEW post ********************** move to add page ******************************************/
app.get("/campground/new" , (req,res)=>{
    res.render("campgrounds/new");
     
});



/***** ADD NEW CAMPGROUND *********** post request to add new camp ground ********************************/
app.post("/campground", (req,res)=>{
    
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

// ------------------- show templates--------
app.get("/campground/:id" , (req, res)=>{
      
      Campground.findById(req.params.id).populate("comments").exec( (err, foundCampground)=>{
          if(err)
          {
              console.log(err);
          }else{
              res.render("campgrounds/show", { campground : foundCampground});
          }
          
      });
      
});


//------------------ comments routes ------------


app.get("/campground/:id/comments/new" , function(req , res){
    
    Campground.findById(req.params.id , function(err , campground){
       
       if(err) {
           console.log(err);
       } else {
           res.render("comments/new" , {campground : campground});
       }
        
    });
});

app.post("/campground/:id/comments" , function(req, res){
    
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
                    
                    foundCampground.comments.push(comment); //save comments
                        foundCampground.save();
                        
                        res.redirect("/campground/"+req.params.id);
                }
                
            });
            
        }
        
    });
    
});




/********************************* for ALL route *******************************************/
app.get("*" , (req,res)=>{
   res.redirect("/campground"); 
});

app.listen(process.env.PORT , process.env.IP , ()=>{
    console.log("Server listening!!");
});