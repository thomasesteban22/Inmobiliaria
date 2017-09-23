var express = require("express")
var router = express.Router();
var Bano = require("../models/bano")

router.get("/", function (req, res) {
    Bano.find(function (err, banos) {
        if (err) res.render("error", err);
        res.render("bano/index", {banos: banos});
    });
});

router.get("/crear", function (req, res) {
    res.render('bano/crear');
});
router.post("/crear", function (req, res) {
    var bano = new Bano();
    bano.cantidad2 = req.body.cantidad2;
    bano.save(function (err, bano) {
        if (err) res.send("error al guardar")
    });
    res.redirect("/bano");
});


module.exports = router;
