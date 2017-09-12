var express = require('express');
var Propiedad = require('../models/propiedad')
var router = express.Router();
var Garaje = require("../models/garaje");
var Bano = require("../models/bano");
var TipoDePropiedad = require("../models/tipoDePropiedad")
var TipoDeInmueble = require("../models/tipoDeInmueble")
/* GET home page. */
router.get('/', function (req, res) {
  Propiedad.find(function (err, propiedades) {
    if (err) return console.error(err);
    router.get('/economicas', function(req, res){
      Propiedad.find(function(err, propiedades){
        if(err) return console.error(err)
      });
    });
    Garaje.find(function (err, garajes) {
      if (err) res.render("error", err);
      Bano.find(function (err, banos) {
        if (err) res.render("error", err);
        TipoDePropiedad.find(function (err, tipoDePropiedades) {
          if (err) res.render("error", err);
          TipoDeInmueble.find(function (err, tipoDeInmuebles) {
            if (err) res.render("error", err)
            for (var i = 0; i < propiedades.length; i++)
            { 
              propiedades[i].imagenes[0].clase = "active";
                 console.log(propiedades[i].imagenes[0])
            }
            Propiedad.find({}).
            sort({ precio: 1 }).
            limit(3)
            .exec(function(err, propiedadesEconomicas){
                if(err){
                    console.log(err);
                    res.send("error consultando las propiedades mas economicas");
                }
                console.log(propiedadesEconomicas)
                res.render('index', {
                  propiedades: propiedades,
                  garajes: garajes,
                  banos: banos,
                  tipoDePropiedades: tipoDePropiedades,
                  tipoDeInmuebles: tipoDeInmuebles,
                  propiedadesEconomicas : propiedadesEconomicas
                });
                // res.render('propiedad',{economicas: 'Propiedad', propiedad:precio})
            });
          });

        });
      });
    });

  });
});

router.post("/", function (req, res) {
  var consulta = {};
  var ncuartos = req.body.ncuartos;
  var tipoDePropiedad = req.body.tipoDePropiedad;
  var tipoDeInmueble = req.body.tipoDeInmueble;
  var ngarajes = req.body.ngarajes;
  var nbanos = req.body.nbanos;
  if (ncuartos) {
    consulta.ncuartos = parseInt(ncuartos);
  };
  if (tipoDeInmueble) {
    consulta.tipoDeInmueble = tipoDeInmueble
  };
  if (tipoDePropiedad) {
    consulta.tipoDePropiedad = tipoDePropiedad
  };
  if (ngarajes) {
    consulta.ngarajes = parseInt(ngarajes);
  };
  if (nbanos) {
    consulta.nbanos = parseInt(nbanos);
  };
  console.log(consulta);
  Propiedad.find(consulta
    , function (err, propiedades) {

      if (err) {
        res.send("error al tomar propiedades");
        console.log(err);
      };
      Garaje.find(function (err, garajes) {
        if (err) res.render("error", err)
        res.render('index', { propiedades: propiedades, garajes: garajes });
      });
    });
});


module.exports = router;
