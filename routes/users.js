const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportLocal = require('passport-local');
const usersController =require('../controllers/users_controller');
const Passport = require('../dbconnect/passport-local-strategy');
// const nodeMail = require('nodemailer')
// const Otp = require('../../media/mailer/otp_mailer');

router.get('/myprofile',Passport.checkAuthentication, usersController.myprofile);
router.get('/profile/:id',Passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.get('/forgot',usersController.forgotpass );
router.post('/checkmail',usersController.sendOTP);
router.post('/verify', usersController.verify)
router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);


router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);

module.exports = router;