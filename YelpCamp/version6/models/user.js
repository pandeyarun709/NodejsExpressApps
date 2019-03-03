var mongoose    =   require("mongoose"),
    passportLocalMongoose    =   require("passport-local-mongoose")
    
    
    
var userSchema = new mongoose.Schema({
    username : String,
    password : String
});

userSchema.plugin(passportLocalMongoose); // add important function to userSchema for authentication

module.exports = mongoose.model("User" , userSchema);

