const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const db = require('../../database/connect')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  authorization: {
    type: Boolean,
    required: false,
  },
})

UserSchema.pre('save', function (next) {
  const user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err)
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) return next(err)
        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})

UserSchema.methods.comparePassword = function (password) {
  const currentPassword = this.password
  return new Promise(function (resolve, reject) {
    bcrypt.compare(password, currentPassword, function (err, isMatch) {
      resolve(isMatch)
      if (err) reject(err)
    })
  })
}

UserSchema.methods.compareVerifyHash = function (password) {
  const currentPassword = this.password
  return new Promise(function (resolve, reject) {
    bcrypt.compare(password, currentPassword, function (err, isMatch) {
      resolve(isMatch)
      if (err) reject(err)
    })
  })
}

module.exports = mongoose.model('User', UserSchema)
