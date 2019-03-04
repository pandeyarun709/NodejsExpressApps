var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   =  require("./models/comment");

// var data = [
//       {
//           name : "Mountain",
//           image : "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//           description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

//       },
//       {
//           name : "river",
//           image : "https://images.unsplash.com/photo-1505232530843-7e94d7faac73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//           description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//       },
//       {
//           name : "Fores",
//           image : "https://images.unsplash.com/photo-1475564481606-0f9f5d97c047?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//           description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//       }
//     ];




function seedDB() {
        
        Campground.remove({} , function(err){
        if(err) {
            console.log(err);
        }
        console.log("remove all campGrounds");
        
        // // Adding new Campground
        // data.forEach(function(seed){
        //     Campground.create(seed , function(err , camground){
                
        //         if(err){
        //             console.log(err);
        //         } else {
        //             console.log("Campground ground added");
                    
        //                 //Comment ----------------
        //                 Comment.create({
        //                     text : "It is greate place to relax your mind",
        //                     author : "Arun"
        //                 }, function(err , comment){
        //                      if (err) {
        //                          console.log(err);
        //                      } else {
        //                          console.log("Comment added");
        //                          camground.comments.push(comment);
        //                          camground.save(); // save
                                 
        //                      }
        //                 });
        //         }
        //   });
            
            
        // });
        
        
        
    });
    
}

module.exports = seedDB ;