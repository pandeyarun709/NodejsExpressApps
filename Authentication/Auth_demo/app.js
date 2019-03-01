var express               = require("express"), 
    app                   = express(),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")
    
    
mongoose.connect("mongodb://localhost/auth_demo",{ useNewUrlParser: true });
app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended: true})); 

 
app.use(require("express-session")({
     secret: "My name is Arun Pandey and I love football and coding",
     resave: false,
     saveUninitialized: false
}));

passport.use(new LocalStrategy( User.authenticate() ));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*###################################  Routes  ######################################*/ 

app.get("/" , function(req , res){
    
     res.render("home");         
 });
 
 
app.get("/secret" , isLoggedIn, function(req , res){
     res.render("secret");  
});


//------------  auth routes 

app.get("/register" , function(req, res){
    
    res.render("new");
});

app.post("/register" , function(req , res){
   var name = req.body.username;
   var password = req.body.password;
   
   User.register({username : name } , password , function(err , user){
         
         if(err) {
             console.log(err);
             res.render("new");
         }
         
         passport.authenticate("local")(req, res , function(){
             res.render("secret");
         });
       
   })
     
});

//--------------   login routes ---------------------------
app.get("/login" , function(req , res){
    res.render("login"); 
});

// ---- validate is user authenticated---
app.post("/login" , passport.authenticate("local" , {
        successRedirect : "/secret",
        failureRedirect : "/login"
          
}), function(req, res){
    
});

//--------------- log out ----------
app.get("/logout" , function(req , res){
    req.logout();
    res.redirect("/");
});


//--------------- validating function is user logged in or not
function isLoggedIn(req ,res , next) {
    if(req.isAuthenticated()) {
        return next();
    } 
    
    res.redirect("/login");
}

app.listen(process.env.PORT , process.env.IP , ()=>{
   console.log("Server Started........."); 
});