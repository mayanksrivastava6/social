const express = require('express');
const router = express.Router();

const usersController =require('../controllers/users_controller')

router.get('/home', usersController.home);

router.get('/sign_up', usersController.signUp);
router.get('/sign_in', usersController.signIn);

router.post('/create', usersController.create);
router.post('/create-session', usersController.create_session )

module.exports = router;