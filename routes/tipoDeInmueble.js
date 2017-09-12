var express = require("express");
var router = express.Router();
var TipoDeInmueble = require("../models/tipoDeInmueble");

router.get("/", function (req, res) {
    TipoDeInmueble.find({}, function(err, tipoDeInmuebles){
         res.render("tipoDeInmueble/index", {tipoDeInmuebles: tipoDeInmuebles});
    });
   
});

router.get("/crear", function (req, res) {
    res.render("tipoDeInmueble/crear")
});
router.post("/", function (req, res) {
    var tipoDeInmueble = new TipoDeInmueble();
    tipoDeInmueble.valor = req.body.valor;
    tipoDeInmueble.save(function (err, tipoDeInmueble) {
        if(err) res.render("error", err)
            res.redirect("/tipoDeInmueble")
    });
});
module.exports = router;