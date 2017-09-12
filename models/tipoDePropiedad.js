var mongoose = require("mongoose")

var TipoDePropiedad = new mongoose.Schema({

    valor : String

});

module.exports = mongoose.model("TipoDePropiedad", TipoDePropiedad);