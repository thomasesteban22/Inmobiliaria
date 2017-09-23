var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs"); 

var User = new mongoose.Schema(
{
    email : {type : String, require : true},
    displayName : String,
    imagen: String,
    password : {type:String, required :true},
    google : {type:Object},
    facebook:{type:Object}
});
User.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}
User.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}
module.exports = mongoose.model("User", User)