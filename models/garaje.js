var mongoose = require("mongoose");

var Garaje = new mongoose.Schema(
{
    cantidad : Number
}
);

module.exports = mongoose.model("Garaje", Garaje)