var express    =   require("express");
var app        =   express();
var bodyParser =   require("body-parser");
var mongoose   =   require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine" , "ejs");

// ----------- SCHEMA -------
var campgroundSchema = new mongoose.Schema(
    {
      name: String,
      image: String,
      description: String 
});

var Campground = new mongoose.model("Campground" , campgroundSchema);

/*
Campground.create(
        {
            name : "hello",
            image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104491f9c67ca2efb3ba_340.jpg ",
            description: "It is a great place to calm your mind & enjoy the beauty of nature."
        }, 
        function(err , campground){
            
            if(err){
                console.log(err);
            }else{
                
                console.log("New campground create");
                console.log(campground);
            }
});
        
*/




/***** INDEX ********************* main landing page *******************************************/
app.get("/campground" , (req , res)=>{
    
    //--------------- fetching campground from db
    Campground.find({} , function(err , allCampGrounds){
        
        if(err)
        {
            console.log(err);
        }else{
            res.render("index",{campGrounds : allCampGrounds});
        }
         
    });
});

/****** NEW ********************** move to add page ******************************************/
app.get("/campground/new" , (req,res)=>{
    res.render("addNewCampGround");
     
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

// ------------------- show templates
app.get("/campground/:id" , (req, res)=>{
      
      Campground.findById(req.params.id , (err, foundCampground)=>{
          if(err)
          {
              console.log(err);
          }else{
              res.render("show", { campground : foundCampground});
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