const express = require('express');

//middlewares
const validations = require('./../middlewares/validations.middleware');

//controllers
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post(
  '/register',
  validations.createUserValidation,
  authController.register
);

router.post('/login', authController.login);

module.exports = router;
