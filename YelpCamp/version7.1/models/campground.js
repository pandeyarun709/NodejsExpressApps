var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema(
    {
      name: String,
      image: String,
      description: String ,
      author : {
                 id : {
                     type : mongoose.Schema.Types.ObjectId,
                     ref : "User"
                 },
                 username : String
      },
      comments : [
                  {
                      type : mongoose.Schema.Types.ObjectId,
                      ref : "Comment"
                  }
          ]
});

//var Campground = new mongoose.model("Campground" , campgroundSchema);

 module.exports = mongoose.model("Campground" , campgroundSchema);
 
 
 
 // Not to use know
 /*
Campground.create(
        {
            name : "hello",
            image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104491f9c67ca2efb3ba_340.jpg ",
            description: "It is a great place to calm your mind & enjoy the beauty of nature."
        }, 
        function(err , campground){
            
            if(err){
                console.log(err);
            }else{
                
                console.log("New campground create");
                console.log(campground);
            }
});
       
*/