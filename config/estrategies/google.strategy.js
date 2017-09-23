var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var User = require("../../models/user");
var generatePassword = require("generate-password");

module.exports=function(){
    passport.use(new GoogleStrategy({
        clientID:process.env.GOOGLEID,
        clientSecret :process.env.GOOGLEKEY,
        callbackURL: process.env.GOOGLECALLBACK
    },processResult));
    
};

function processResult(req, accessToken, refreshToken, profile, done){
    var query = {
        "google.id" : profile.id
    }
    User.findOne(query, function(err, user){
        if(user){
           return done(null, user);
        }
        else{
            var user = new User();
            user.email = profile.emails[0].value;
            user.imagen = profile.photos[0].value;
            user.displayName = profile.displayName;
            user.password = user.generateHash(generatePassword.generate({length:15, numbers:true}));
            user.google = {};
            user.google.id = profile.id;
            user.google.token = accessToken;
            user.save(function(err){
                if(err) return done(err);
                else return done(null, user);
                });
        }
    });
}