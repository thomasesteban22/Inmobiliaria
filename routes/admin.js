var express = require('express');
var router = express.Router();

router.use("/", function(req,res,next){
    if(!req.user){
        res.redirect("/auth/login")
    }
    next();
});
router.get("/",function(req, res){
    res.render("admin/admin")
});

module.exports = router;