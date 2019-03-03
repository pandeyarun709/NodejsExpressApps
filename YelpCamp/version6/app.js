
var express        =   require("express"),
    app            =   express(),
    bodyParser     =   require("body-parser"),
    mongoose       =   require("mongoose"),
    passport       =   require("passport"),
    LocalStrategy  =   require("passport-local"),
    User           =   require("./models/user"),
    Campground     =   require("./models/campground"),
    seedDB         =   require("./seeds"),
    Comment        =   require("./models/comment");

mongoose.connect("mongodb://localhost/yelp_camp",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine" , "ejs");
app.use(express.static(__dirname+"/public"));

seedDB();
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


//---------- middleWare ---
app.use(function(req,res , next){  // user avialable to every page this middle added to every route
   res.locals.currentUser = req.user; 
   next();
});



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
app.get("/campground/new" , isLoggedIn , (req,res)=>{
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


//------------------ comments routes ------------------------


app.get("/campground/:id/comments/new" , isLoggedIn , function(req , res){
    
    Campground.findById(req.params.id , function(err , campground){
       
       if(err) {
           console.log(err);
       } else {
           res.render("comments/new" , {campground : campground});
       }
        
    });
});

app.post("/campground/:id/comments" ,isLoggedIn, function(req, res){
    
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

//====================================
// AUTH ROUTE
//====================================


//---------------------- Register/Login -----------------
app.get("/register" , function(req, res) {
     res.render("register"); 
});


app.post("/register" , function(req, res) {
   var newUser = new User({username :req.body.username});
   var password = req.body.password;
   
   User.register(newUser , password , function(err ,user){
       if(err){
           console.log(err);
           res.redirect("/register");
       }
       
       passport.authenticate("local")(req, res ,function(){
           res.redirect("/campground");
       })
   }); 
});

//--------------------  Login --------------------------
app.get("/login" , function(req, res) {
    res.render("login"); 
});

app.post("/login" ,passport.authenticate("local" , {
    successRedirect :"/campground" , 
        failureRedirect : "/login"
    }), function(req, res) {
       
});

//-------------------- Logout --------------------
app.get("/logout" , function(req, res) {
   req.logout();
   res.redirect("/campground");
});

// -------------- isLoggedIn ---------------------
function isLoggedIn(req , res , next) {
    if(req.isAuthenticated()) {
        return next();  //it call next function in the call back
    }
    
    res.redirect("/login");
    
}




/********************************* For ALL route *******************************************/
app.get("*" , (req,res)=>{
   res.redirect("/campground"); 
});

app.listen(process.env.PORT , process.env.IP , ()=>{
    console.log("Server listening!!");
});