const passport = require('passport')
require('../config/passport')(passport)
const express = require('express')
const router = express.Router()
const AuthController = require('../app/Controllers/AuthController')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

module.exports = router
