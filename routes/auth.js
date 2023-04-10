const express = require('express');

const authenticate = require('middleware/authentication')
const {Schema, Validate} = require('middleware/joi')
const AuthController = require('controllers/authController')


const router = express.Router()

router.post('/login', Validate(Schema.login). AuthController.login)
router.post('/register', Validate(Schema.register). AuthController.register)

router.get('/current', authenticate, AuthController.current)
router.get('/logout', authenticate, AuthController.logout)
router.get('/verify/:verificationToken', AuthController.verify)

module.exports = router