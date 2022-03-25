const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

router.get('/login', user_controller.get_login);
router.post('/login', user_controller.post_login);

router.get('/signup', user_controller.get_signup);
router.post('/signup', user_controller.post_signup);

router.get('/logout', user_controller.get_logout);

router.get('/:id', user_controller.get_user_profile);

module.exports = router;
