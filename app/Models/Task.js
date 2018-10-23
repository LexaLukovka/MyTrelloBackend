const mongoose = require('mongoose')
const db = require('../../database/connect')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
  task: {
    type: String,
    required: true
  },
})


module.exports = mongoose.model('Task', TaskSchema)
