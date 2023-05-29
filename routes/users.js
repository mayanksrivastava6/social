const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportLocal = require('passport-local');
const usersController =require('../controllers/users_controller');
const Passport = require('../dbconnect/passport-local-strategy');


router.get('/profile/:id',Passport.checkAuthentication, usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);


router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);

// router.get('/sign-out', function(req, res){
//     req.logout();
//     res.redirect('/'); //Can fire before session is destroyed?
//   });
module.exports = router;