var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended : true}));

var allCampGrounds = [
        {
            name : "hello",
            image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104491f9c67ca2efb3ba_340.jpg "
        },
        {
            name: "mumbai",
            image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f9c67ca2efb3ba_340.jpg"
        }
        
    ];
    


app.set("view engine" , "ejs");

/************************** main landing page *******************/
app.get("/campground" , (req , res)=>{
    
    res.render("campGround",{campGrounds : allCampGrounds});
});

/**************** post request to add new camp ground **************/
app.post("/campground", (req,res)=>{
    
    var newCampground = {
        name : req.body.name,
        image : req.body.image
    };
    
    allCampGrounds.push(newCampground);
    
    res.redirect("/campground");
   
});


/*************** move to add page ******************/
app.get("/campground/new" , (req,res)=>{
    res.render("addNewCampGround");
     
});


/****************** for route *******************/
app.get("*" , (req,res)=>{
   res.redirect("/campground"); 
});

app.listen(process.env.PORT , process.env.IP , ()=>{
    console.log("Server listening!!");
});