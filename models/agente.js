var mongoose = require("mongoose");

var Agente = new mongoose.Schema
({
    nombre : {type : String, required : true},
    apellido : {type : String, required : true},
    telefono : {type : Number, required : true},
    direccion : {type : String, required : true},
    correoElectronico : {type : String, required : true},
    foto : {},
    calificacion : {type : Number, required : true},
    estado : {type : Boolean, required : true}
    
});
module.exports = mongoose.model("Agente", Agente, "Agente");