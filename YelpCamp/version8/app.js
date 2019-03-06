
var express        =   require("express"),
    app            =   express(),
    bodyParser     =   require("body-parser"),
    mongoose       =   require("mongoose"),
    passport       =   require("passport"),
    LocalStrategy  =   require("passport-local"),
    User           =   require("./models/user"),
    Campground     =   require("./models/campground"),
 // seedDB         =   require("./seeds"),
    Comment        =   require("./models/comment"),
    methodOverride =   require("method-override");


// Requiring Routes
var commentRouter      = require("./routes/comment"),
    campgroundRouter   = require("./routes/campground"),
    indexRouter        = require("./routes/index");



mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine" , "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));

//  seedDB(); // seeds database(create from new end)

//=======================
//  PassPort configuration
//========================

app.use(require("express-session")({
    secret: "I am write to create something new in myself!",
    resave: false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //tell passport use local stategy
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//---------- middleWare ----------
app.use(function(req,res , next){  // user avialable to every page this middle added to every route
   res.locals.currentUser = req.user; 
   next();
});


// Using Routes
app.use(indexRouter);
app.use("/campground" ,campgroundRouter);
app.use("/campground/:id/comments" ,commentRouter); // it append /campground in front of every routes





/********************************* For ALL route *******************************************/
app.get("*" , (req,res)=>{
   res.redirect("/campground"); 
});

app.listen(process.env.PORT , process.env.IP , ()=>{
    console.log("Server listening!!");
});