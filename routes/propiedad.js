var express = require('express');
var Propiedad = require("../models/propiedad");
var router = express.Router();
var formidable = require("formidable");
var APPROOT = require('../settings');
var Ciudad = require("../models/ciudad")
var Pais = require("../models/pais")
var Departamento = require("../models/departamento")

router.get("/economicas", function(req, res){
    Propiedad.find({}).
    sort({ precio: 1 }).
    limit(3)
    .exec(function(err, propiedades){
        if(err){
            console.log(err);
            res.send("error consultando las propiedades mas economicas");
        }
        res.render('propiedad',{economicas: 'Propiedad', propiedad:precio})
    });
});

router.get("/crear", function (req, res) {
    Pais.find({},function (err, paises) {
        Departamento.find({},function (err,departamentos) {
            Ciudad.find({},function (err,ciudades) {
                console.log(paises)
                res.render("propiedad/crear",{ciudades:ciudades, paises:paises, departamentos:departamentos });
            });
        });
    });
});
router.get('/:id', function (req, res) {
    Propiedad.findById(req.params.id, function (err, propiedad) {
        if (err) {
            res.send("Error al treaer propiedades");
        }
        res.render('propiedad', { title: 'Propiedad', propiedad: propiedad });
    });
});
router.post("/", function (req, res) {
    var propiedad = new Propiedad();
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        propiedad.nombre = fields.nombre;
        propiedad.ncuartos = fields.ncuartos;
        propiedad.nbanos = fields.nbanos;
        propiedad.ngarajes = fields.ngarajes
        propiedad.metrosCuadrados = fields.metrosCuadrados
        propiedad.tipoDePropiedad = fields.tipoDePropiedad
        propiedad.tipoDeInmueble = fields.tipoDeInmueble
        propiedad.precio = fields.precio
        propiedad.barrio = fields.barrio
        propiedad.direccion = fields.direccion
        propiedad.descripcion = fields.descripcion
        propiedad.fechaDeRegistro = Date.now();
        propiedad.pais = fields.pais
        propiedad.ciudad = fields.ciudad
        propiedad.departamento = fields.departamento
    });

    form.on('fileBegin', function (name, file) {

        file.path = APPROOT.ROOT_DIR + "/public/images/" + file.name;
    });
    form.on('file', function (name, file) {
        propiedad.imagenes.push({ name: file.name, path: "/images/" + file.name, type: file.type });
    });
    form.on('end', function () {
        propiedad.save(function (err, propiedad2) {
            if (err) {
                var errorMessages = {};
                for (var i in err.errors) {
                    errorMessages[err.errors[i].path] = err.errors[i].message;
                    console.log(err.errors[i]);
                }
                console.log(propiedad);
                res.render("propiedad/crear", { propiedad, errors: errorMessages })

            }
            else
            { res.redirect('/') };
        });

    });

});

router.get("/actualizar/:id", function (req, res) {
    Propiedad.findById(req.params.id, function (err, propiedad) {
        if (err) {
            res.send("error al tomar propiedades");
        };
        res.render('propiedad/actualizar', { propiedad: propiedad })
    });
});

router.post("/actualizar", function (req, res) {
    Propiedad.findById(req.body.id, function (err, propiedad) {
        if (err) {
            res.send("error al actulizar propiedades");
        };

        propiedad.nombre = req.body.nombre;
        propiedad.ncuartos = req.body.ncuartos
        propiedad.nbanos = req.body.nbanos
        propiedad.ngarajes = req.body.ngarajes
        propiedad.metrosCuadrados = req.body.metrosCuadrados
        propiedad.tipoDePropiedad = req.body.tipoDePropiedad
        propiedad.tipoDeInmueble = req.body.tipoDeInmueble
        propiedad.precio = req.body.precio
        propiedad.barrio = req.body.barrio
        propiedad.direccion = req.body.direccion
        propiedad.descripcion = req.body.descripcion
        propiedad.fechaDeRegistro = Date.now();
        
        propiedad.save(function (err, propiedad) {
            if (err) res.send("Error al guardar");
            res.redirect("/");

        });
    });
});

router.get('/listar/:id', function (req, res, next) {
    Propiedad.find(function (err, propiedades) {
        if (err) res.render("error");
        res.render('propiedad/listar', { propiedades: propiedades });
    });
});

router.get("/eliminar/:id", function (req, res) {
    Propiedad.findByIdAndRemove(req.params.id, function (err) {
        if (err) res.sed("Error al buscar y remover")
        res.redirect("/");
    })
});
module.exports = router;

