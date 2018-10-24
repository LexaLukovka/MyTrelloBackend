const express = require('express')
const router = express.Router()

const TaskController = require('../app/Controllers/TaskController')

router.post('/task', TaskController.store)
router.put('/task', TaskController.update)
router.delete('/task/:groupId/:taskId', TaskController.destroy)

module.exports = router
