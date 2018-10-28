var express = require('express')
var router = express.Router()

const UploadController = require('../app/Controllers/UploadController')

router.post('/upload', UploadController.store)

module.exports = router
