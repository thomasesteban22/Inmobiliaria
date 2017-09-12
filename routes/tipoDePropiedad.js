var express = require("express");
var router = express.Router();
var TipoDePropiedad = require("../models/tipoDePropiedad");

router.get("/", function(req, res){
    TipoDePropiedad.find({},function(err,tipoDePropiedades){
        res.render("tipoDePropiedad/index", {tipoDePropiedades:tipoDePropiedades}); 
    });

});
router.get("/crear", function(req, res){
    res.render("tipoDePropiedad/crear");
});

router.post("/", function(req, res){
    var tipoDePropiedad = new TipoDePropiedad();
    tipoDePropiedad.valor = req.body.valor; 
    tipoDePropiedad.save(function(err, tipoDePropiedad){
        if(err) res.render("error",err)
            res.redirect("/tipoDePropiedad");
    });
    
});

module.exports = router;