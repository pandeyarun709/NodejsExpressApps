var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended : true}));
//app.use(express.static(""));
app.set("view engine","ejs");


var campGrounds = [
        {name: "Shimla" , image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b014459df5c070a3eab3_340.jpg"},
        {name:"Kashmir" ,image:"https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b014459df5c070a3eab3_340.jpg"},
        {name: "Shimla" , image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b014459df5c070a3eab3_340.jpg"},
        {name:"Kashmir" ,image:"https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b014459df5c070a3eab3_340.jpg"},
        {name: "Shimla" , image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b014459df5c070a3eab3_340.jpg"},
        {name:"Kashmir" ,image:"https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b014459df5c070a3eab3_340.jpg"}
    ];

/* ####################  route of Landing page #########*/
app.get("/" , (req,res)=>{
    res.render("landing");
});


/*####################### camp ground ################*/
app.get("/campground" , (req,res)=>{
    res.render("campGround", {campGrounds : campGrounds});
});


app.get("/campground/new" , (req,res)=>{
    res.render("addCamp");
});

app.post("/campground" , (req, res)=>{
       
        console.log("check");
       var name = req.body.name;
       var  img = req.body.img;
      // console.log(req.query);
    var newCamp = {name: name , image: img};
    campGrounds.push(newCamp);
    res.redirect("/campground");
});



app.listen(process.env.PORT,process.env.IP , ()=>{
   console.log("Server Listening"); 
});