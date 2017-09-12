var mongoose = require("mongoose");

var Departamento = new mongoose.Schema(
{
    idPais :{type: mongoose.Schema.Types.ObjectId, ref:"Pais"}, 
    valor : {type:String, required:true} 
}
);



module.exports = mongoose.model("Departamento", Departamento)