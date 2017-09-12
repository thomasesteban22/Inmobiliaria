var mongoose = require("mongoose");

var Pais = new mongoose.Schema(
{
    valor:{type:String, required:true}
}
);



module.exports = mongoose.model("Pais", Pais)