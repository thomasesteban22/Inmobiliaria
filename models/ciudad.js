var mongoose = require("mongoose");

var Ciudad = new mongoose.Schema(
{
    valor:{type:String, required:true}
}
);



module.exports = mongoose.model("Ciudad", Ciudad)