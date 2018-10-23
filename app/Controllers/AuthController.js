const User = require('../Models/User')
const LoginValidator = require('../Validators/LoginUser')
const { validate } = require('../Validators/Validator')
const RegisterValidator = require('../Validators/RegisterUser')
const jwt = require('jsonwebtoken')
const config = require('../../config/database')

class AuthController {

  async login(request, response) {
    const [err, data] = await validate(request.body, LoginValidator)
    if (err) return response.status(401).json(err)

    const user = await User.findOne({ email: data.email })
    const token = jwt.sign(user, config.secret)

    return response.json({ token })
  }

  async register(request, response) {
    const [err, data] = await validate(request.body, RegisterValidator)
    if (err) return response.status(401).json(err)

    const newUser = new User({
      name: data.name,
      email: data.email,
      password: data.password,
      authoization: false,
    })

    const user = await newUser.save()

    const token = jwt.sign(user, config.secret)
    return response.json({ token })
  }
}

module.exports = new AuthController()
