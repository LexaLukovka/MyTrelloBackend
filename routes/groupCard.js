const express = require('express')
const router = express.Router()

const GroupCardController = require('../app/Controllers/GroupCardController')

router.get('/groupCard', GroupCardController.index)
router.post('/groupCard', GroupCardController.store)
router.put('/groupCard', GroupCardController.update)
router.delete('/groupCard/:groupId', GroupCardController.destroy)

module.exports = router
