var mongoose = require("mongoose");

var Bano = new mongoose.Schema(
{
    cantidad2 : Number
}
);

module.exports = mongoose.model("Bano", Bano)