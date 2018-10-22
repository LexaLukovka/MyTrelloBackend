const express = require('express')
const router = express.Router()

const UsersController = require('../app/Controllers/UsersController')

router.get('/users', UsersController.index)

module.exports = router
