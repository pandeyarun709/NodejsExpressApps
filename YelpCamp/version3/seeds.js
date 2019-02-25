var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   =  require("./models/comment");

var data = [
       {
           title : "Mountain",
           image : "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
           description : "jai"
       },
       {
           title : "river",
           image : "https://images.unsplash.com/photo-1505232530843-7e94d7faac73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
           description : "blha "
       },
       {
           title : "Fores",
           image : "https://images.unsplash.com/photo-1475564481606-0f9f5d97c047?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
           description : "anne de anne"
       }
    ];




function seedDB() {
        
        Campground.remove({} , function(err){
        if(err) {
            console.log(err);
        }
        console.log("remove all campGrounds");
        
        // Adding new Campground
        data.forEach(function(seed){
            Campground.create(seed , function(err , camground){
                
                if(err){
                    console.log(err);
                } else {
                    console.log("Campground ground added");
                    
                        //Comment ----------------
                        Comment.create({
                            text : "It is greate place to relax your mind",
                            author : "Arun"
                        }, function(err , comment){
                             if (err) {
                                 console.log(err);
                             } else {
                                 console.log("Comment added");
                                 camground.comments.push(comment);
                                 camground.save(); // save
                                 
                             }
                        });
                }
           });
            
            
        });
        
        
        
    });
    
}

module.exports = seedDB ;