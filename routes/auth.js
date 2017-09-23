var express = require('express');
var router = express.Router();
var User = require("./../models/user");
var passport = require("passport")


router.get("/facebook/callback", passport.authenticate("facebook",{
    successRedirect:"/",
    failureRedirect:"/auth/login"
}))

router.get('/facebook',
passport.authenticate('facebook', { scope: ['email']}),
function(req, res){
});


router.get("/google/callback", passport.authenticate("google", {
    successRedirect : "/",
    failureRedirect : "/auth/login",
}));


router.get("/google", passport.authenticate("google",{
    scope : ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"]
}));

router.get("/registro", function(req,res){
    res.render("auth/registro", {message:req.flash("message")});
});

router.get("/login", function(req, res){
    res.render("auth/logIn", {message:req.flash("message")});
});
router.post("/login", passport.authenticate("local", {
    successRedirect : "/", 
    failureRedirect : "/auth/login",
    failureFlash : true
}));
router.post("/registro", function(req, res){
    User.findOne({
        email : req.body.email,
    
    }, function(err, user){
        if(err) return res.render("/auth/login",{message:"Error guardando usuario"});
        if(user) return res.render("/auth/login", {message:"Email ya se encuentra registrado"});
        var user = new User();
        user.email = req.body.email;
        user.password = user.generateHash(req.body.password);
        user.save(function(err){
            if(err) return res.render("/auth/login",{message:"Error guardando usuario"})
            return res.redirect("/auth/login");
        });
    })
});
router.get("/logOut", function(req,res){
req.logout();
req.session.destroy();
res.redirect("/");
});



module.exports = router;