const mongoose = require('mongoose')
const db = require('../../database/connect')
const Schema = mongoose.Schema

const GroupCardSchema = new Schema({
  index: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  tasks: {
    type: Array,
    required: true,
  },
})

module.exports = mongoose.model('GroupCard', GroupCardSchema)
