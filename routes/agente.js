var express = require("express");
var router = express.Router();
var Agente = require("../models/agente");
var APPROOT = require('../settings');
var formidable = require("formidable");

router.get("/", function (req, res) {
    Agente.find(function(err, agentes){
        res.render("agente/index", {agentes : agentes})
    });
    
})

router.get("/crear", function (req, res) {
    res.render("agente/crear")
})

router.post("/crear", function (req, res) {
    var agente = new Agente();
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        agente.nombre = fields.nombre;
        agente.apellido = fields.apellido;
        agente.telefono = fields.telefono;
        agente.direccion = fields.direccion;
        agente.correoElectronico = fields.correoElectronico;
        agente.calificacion = fields.calificacion;
        agente.estado = fields.estado;
   });

    form.on('fileBegin', function (name, file) {
        file.path = APPROOT.ROOT_DIR + "/public/images/" + file.name;
            agente.foto = { name: file.name, path: "/images/" + file.name, type: file.type };
    });
    form.on('file', function (name, file) {
    });
    form.on('end', function () {
        agente.save(function (err, agente) {
            console.log(agente)
            if (err) {console.log(err);
                    res.send("Error al guardar");
            }
             
        res.redirect('/agente');

        });

    });
});

    module.exports = router;