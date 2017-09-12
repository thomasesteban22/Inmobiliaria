var express = require("express")
var router = express.Router();
var Pais = require("../models/pais")
var Ciudad = require("../models/ciudad")
var Departamento = require("../models/departamento")

router.post("/pais", function(req, res){
var paises = ["Colombia","Peru"]
for(var i = 0; i < paises.length; i++)
    Pais.create({valor:paises[i]},
    function(err){
        if(err){
            console.log(err, "error al crear pais")
        }
        console.log("Pais creado")
    }
    )
res.send("Paises creados correctamente :)")
});
router.post("/ciudad", function(req, res){
    var ciudades = ["Bogota","Medellin","Cartagena","Santa Marta","Cali"]
for(var i = 0; i < ciudades.length; i++)
    Ciudad.create({valor:ciudades[i]},
    function(err){
        if(err){
            console.log(err, "error al crear ciudad")
        }
        console.log("Ciudad creado")
    }
    )
res.send("Ciudades creadas correctamente :)")
});


router.post("/departamento", function(req, res){

var departamentos = ["Cundinamarca","Valle del cauca"]
for(var i = 0; i < departamentos.length; i++)
    Departamento.create({valor:departamentos[i]},
    function(err){
        if(err){
            console.log(err, "error al crear departamento")
        }
        console.log("Departamento creado")
    }
    )
res.send("Departamentos creados correctamente :)")
});







module.exports = router;