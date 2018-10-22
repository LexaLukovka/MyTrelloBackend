const indicative = require('indicative')
const User = require('../Models/User')
const to = require('../../utils/to')
const validator = {
  ...indicative,
  extend(rule, fn) {
    if (typeof (fn) !== 'function') {
      throw 'Validator.extend expects 2nd parameter to be a function'
    }
    indicative.validations[rule] = fn
  },

  async validate(data, validatorClass) {
    const validator = new validatorClass
    const [err, response] = await to(indicative.validate(
      { ...data },
      validator.rules,
      validator.messages
    ))

    return [err, response]
  }
}

const uniqueEmailFn = async function (data, field, message, args, get) {
  const value = get(data, field)
  if (!value) return
  const user = await User.findOne({ email: value })
  if (user) throw message
}

const matchesEmailFn = async function (data, field, message, args, get) {
  const value = get(data, field)
  if (!value) return
  const user = await User.findOne({ email: data.email })
  if (!user) throw message

  const [err, isMatch] = await to(user.comparePassword(value))
  if (!isMatch || err) throw message
}

const matchesVerifyEmailFn = async function (data, field, message, args, get) {
  const value = get(data, field)
  if (!value) return
  const user = await User.findOne({ email: data.email })
  if (!user) throw message

  const [err, isMatch] = await to(user.compareVerifyHash(value))
  if (!isMatch && err) throw message
}

const emailExistsFn = async function (data, field, message, args, get) {
  const value = get(data, field)
  if (!value) return
  const user = await User.findOne({ email: data.email })
  if (!user) throw message
}

validator.extend('uniqueEmail', uniqueEmailFn)
validator.extend('matchesEmail', matchesEmailFn)
validator.extend('matchesVerify', matchesVerifyEmailFn)
validator.extend('emailExists', emailExistsFn)

module.exports = validator
