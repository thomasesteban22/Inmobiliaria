var mongoose = require("mongoose");

var TipoDeInmueble = new mongoose.Schema({
    valor : String
});

module.exports = mongoose.model("TipoDeInmueble", TipoDeInmueble);