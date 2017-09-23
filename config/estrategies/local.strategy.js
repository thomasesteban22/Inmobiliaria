var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../../models/user");

module.exports = function(){
    passport.use(new LocalStrategy({
        usernameField:"email",
        passwordField:"password",
        passReqToCallback: true

    }, proccessUser));
}
function proccessUser(req, email, password, done){
    User.findOne({
        email : email
    },function(err, user){
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false, req.flash("message", "Correo electronico o contraseña incorrecto"));
        }
        if(!user.validPassword(password)){
            return done(null, false, req.flash("message", "Correo electronico o contraseña incorrecto"));
        }
        return done(null, user);
    });
}
