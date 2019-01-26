var express = require("express");
var app = express();

var request = require("request");

app.set("view engine", "ejs");

/* root route*/
var data;
request( "http://www.omdbapi.com/?s=harry+potter&apikey=thewdb" , (error, response, body)=>{
       if(!error && response.statusCode == 200){
           
            data = JSON.parse(body);
           
       }
});

app.get("/" , (req,res)=>{
   res.render("movieSearch",{data : data});
   
});


/* form route */
app.get("/res" , (req,res)=>{
 
 var url ="http://www.omdbapi.com/?s="+req.query.movie+"&apikey=thewdb";  
   
   request(url , (error, response, body)=>{
       if(!error && response.statusCode == 200){
           
            data = JSON.parse(body);
           res.redirect("/" );
       }
       else res.send("Error in page Load");
       
   });
   
});

app.listen(process.env.PORT, process.env.IP , ()=>{
   console.log("Server listening"); 
});