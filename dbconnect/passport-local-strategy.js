const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');


//authentication using passport.js
passport.use(new LocalStrategy({
    usernameField: 'email'
},
  function(email, password, done){
    User.findOne({email: email}, function(err, user){
        if(err){
            console.log('Error in finding user-->Passport');
            return done(err);
        }

        if (!user || user.password != password){
            console.log('Invalid Username/Password');
            return done(null, false);
        }

        return done(null, user);
    });
  }

));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});



module.exports = passport;