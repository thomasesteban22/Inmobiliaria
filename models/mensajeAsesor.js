var mongoose = require("mongoose");

var MensajeAsesor = new mongoose.Schema(
{
    nombre: String,
    telefono : String,
    email : String,
    mensaje : String,
    agente : String,
    propiedad : String,
}
);



module.exports = mongoose.model("MensajeAsesor", MensajeAsesor)