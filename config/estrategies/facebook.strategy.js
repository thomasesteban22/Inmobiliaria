var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;
var User = require("../../models/user");
var generatePassword = require("generate-password");

module.exports = function(){
    passport.use(new FacebookStrategy({
        clientID : process.env.FACEBOOKID,
        clientSecret :process.env.FACEBOOKKEY,
        callbackURL :process.env.FACEBOOKCALLBACK,
        profileFields: ['id', 'emails', 'name']
        
    },processResult));
};

function processResult(req, accessToken, refreshToken, profile, done){

    var query = {
        "facebook.id" : profile.id
    }
    User.findOne(query, function(err, user){
        if(user){
           return done(null, user);
        }
        else{
            var user = new User();
            user.email = profile.emails[0].value;
            user.displayName = profile.displayName;
            user.password = user.generateHash(generatePassword.generate({length:15, numbers:true}));
            user.facebook = {};
            user.facebook.id = profile.id;
            user.facebook.token = accessToken;
            user.save(function(err){
                if(err) return done(err);
                else return done(null, user);
                });
        }
    });
}