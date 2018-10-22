const mongoose = require('mongoose')
const config = require('../config/database')
mongoose.connect(config.database, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('were connected!')
})

module.exports = db
