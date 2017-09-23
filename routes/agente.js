var express = require("express");
var router = express.Router();
var Agente = require("../models/agente");
var APPROOT = require('../settings');
var formidable = require("formidable");
var nodemailer = require('nodemailer');
var MensajeAsesor = require("../models/mensajeAsesor");

router.get("/", function (req, res) {
    Agente.find(function (err, agentes) {
        res.render("agente/index", { agentes: agentes })
    });
});

router.post("/contactar", function (req, res) {
    var mensaje = new MensajeAsesor();
    mensaje.nombre = req.body.nombre;
    mensaje.telefono = req.body.telefono;
    mensaje.email = req.body.email;
    mensaje.mensaje = req.body.mensaje;
    mensaje.propiedad = req.body.propiedad;
    var contenidoMensaje = JSON.stringify(mensaje);
    if (req.body.agente == "") {
        Agente.findOne({}, function (err, agente2) {
            console.log(agente2);
            if (err | !agente2) res.send("No es posible contactar ahora mismo un agente");
            mensaje.agente = agente2.id;
            mensaje.save(function (err, resultado) {
                enviarMail(agente2.correoElectronico, contenidoMensaje, function (err, resultado) {
                    if (err) res.send("error contactando asesor");
                    else res.redirect("/propiedad/" + mensaje.propiedad);
                });
            });
        });
    }
    else {
        mensaje.agente = req.body.agente;
        Agente.findById(mensaje.agente, function (err, agente) {
            if (err) {
                console.log(err);
                res.send("error contactando agente, intentelo mas tarde");
            }
            mensaje.save(function (err, resultado) {
                enviarMail(agente.correoElectronico, contenidoMensaje, function (err, resultado) {
                    if (err) res.send("error contactando asesor");
                    else res.redirect("/propiedad/" + mensaje.propiedad);
                });
            });
        });
    }
});

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
            if (err) {
                console.log(err);
                res.send("Error al guardar");
            }

            res.redirect('/agente');

        });

    });
});

function enviarMail(asesor, mensaje, resultado) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: proces.env.EMAIL,
            pass : process.env.PASSWORD
        }
    });
    var mailOptions = {
        from: 'noreply@gmail.com',
        to: asesor,
        subject: 'Solicitud de contacto',
        text: mensaje
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            resultado(error, null);
            console.log(error);
        } else {
            resultado(null, info);
            console.log('Email sent: ' + info.response);
        }
    });
}


module.exports = router;