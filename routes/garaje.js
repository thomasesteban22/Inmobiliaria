var express = require("express")
var router = express.Router();
var Garaje = require("../models/garaje")

router.get("/", function (req, res) {
    Garaje.find(function (err, garajes) {
        if (err) res.render("error", err);
        res.render("garaje/index", {garajes: garajes});
    });
});

router.get("/crear", function (req, res) {
    res.render('garaje/crear');
});
router.post("/crear", function (req, res) {
    var garaje = new Garaje();
    garaje.cantidad = req.body.cantidad;
    garaje.save(function (err, garaje) {
        if (err) res.send("error al guardar")
    });
    res.redirect("/garaje");
});



module.exports = router;