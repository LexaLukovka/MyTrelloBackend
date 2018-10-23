const express = require('express')
const router = express.Router()

const TaskController = require('../app/Controllers/TaskController')

router.post('/task', TaskController.store)

module.exports = router