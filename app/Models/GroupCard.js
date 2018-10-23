const mongoose = require('mongoose')
const db = require('../../database/connect')
const Schema = mongoose.Schema

const GroupCardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
})


module.exports = mongoose.model('GroupCard', GroupCardSchema)
