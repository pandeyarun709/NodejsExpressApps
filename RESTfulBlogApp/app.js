var    express  =   require("express"),
           app  =   express(),
    bodyParser  =   require("body-parser"),
      mongoose  =   require("mongoose"),
methodOverride  =   require("method-override"),
expressSanitizer=   require("express-sanitizer");

mongoose.connect("mongodb://localhost/restful_blog_app",{ useNewUrlParser: true,useFindAndModify: false });
app.set("view engine" , "ejs");        // set default extension of  .ejs
app.use(bodyParser.urlencoded({extended: true}));   // body parser to access req.body
app.use(expressSanitizer());          // using sanitizer to handle unusual script 
app.use(express.static("Public"));   // tell express to serve public directory where is all style file
app.use(methodOverride("_method")); // it use to override the method="POST" to use PUT , DELETE route


var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type:Date , default: Date.now}
    
});

var Blog = mongoose.model("Blog" , blogSchema);

/*Blog.create({
    title: "Hello to my Arena",
    image: "https://images.unsplash.com/photo-1457518919282-b199744eefd6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80",
    body: " Want to eat this ,Grab the chance"
},function(err , newBlog){
    
    if(err)
    {
        console.log(err);
    }else{
        console.log(newBlog);
    }
    
});*/

//------------------ restful routes ------------------


//---------------- index route -------------------------
app.get("/" , (req , res)=>{
   res.redirect("/blogs"); 
});

app.get("/blogs" , (req, res)=>{
    
    Blog.find({} , (err , allBlogs)=>{
        
        if(err){
            console.log(err);
        }else{
             res.render("index", {blogs : allBlogs}); 
        }
        
    });
  
});

//------------------ new route ------------
app.get("/blogs/new" , (req,res)=>{
    
    res.render("new");
    
});

// ------------------- Create route ------------------------------
app.post("/blogs" , (req , res)=>{
   
   req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.create(req.body.blog , (err , newBlog)=>{
       if(err){
           console.log(err);
           
           res.render("new"); // render again new 
       } else {
           
           res.redirect("/blogs");
       }
   });
    
});

//------------------------- show route ----------------------------
app.get("/blogs/:id" , function(req, res){
    
    Blog.findById(req.params.id , (err , foundBlog)=>{
       if(err){
           res.redirect("/blogs");
       } else{
           
           //-------------------- show page of selected blog
           //console.log(foundBlog);
           res.render("show" , { blog : foundBlog});
       }
       
        
    });
});

//------------------------- edit route -----------------------
app.get("/blogs/:id/edit" , function(req , res){
    
    
    Blog.findById(req.params.id , function(err , foundBlog){
        if(err){
            res.render("/blogs");  // if any err occurs
        } else{
            
            res.render("edit" , {blog : foundBlog}); // passing details to update
        }
    });

});

//------------------------ udpate route ---- PUT --
app.put("/blogs/:id" , function(req , res){
   
   req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.findByIdAndUpdate(req.params.id , req.body.blog , (err , udatedBlog)=>{
      if(err){
          res.redirect("/blogs");
      }else {
          res.redirect("/blogs/" + req.params.id);
      }
       
   });

});

//---------------------------- Delete route -------------------------------
app.delete("/blogs/:id" , (req ,res)=>{
    Blog.findByIdAndRemove(req.params.id , (err)=>{
          if(err){
              res.redirect("/blogs/"+req.params.id);
          } else{
              res.redirect("/blogs");
          }
          
    });
});


app.listen(process.env.PORT, process.env.IP , function(){
   console.log("Server starts");
    
});



