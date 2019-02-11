var    express  =   require("express"),
           app  =   express(),
    bodyParser  =   require("body-parser"),
      mongoose  =   require("mongoose"),
methodOverride  =   require("method-override");

mongoose.connect("mongodb://localhost/restful_blog_app",{ useNewUrlParser: true });
app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("Public"));
app.use(methodOverride("_method"));

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
   
   Blog.findByIdAndUpdate(req.params.id , req.body.blog ,{new: true}, (err , udatedBlog)=>{
      if(err){
          res.redirect("/blogs");
      }else {
          res.redirect("/blogs" + req.params.id);
      }
       
   });
    
   // res.send("update");
});



app.listen(process.env.PORT, process.env.IP , function(){
   console.log("Server starts");
    
});



