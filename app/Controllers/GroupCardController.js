const GroupCard = require('../Models/GroupCard')
const GroupCardValidator = require('../Validators/GroupCard')
const { validate } = require('../Validators/Validator')

class GroupCardController {

  async index(request, response) {
    const groupCard = await GroupCard.find()

    return response.json({ groupCard })
  }

  async store(request, response) {
    const [err, data] = await validate(request.body, GroupCardValidator)
    if (err) return response.status(401).json(err)

    const newGroup = new GroupCard({
      title: data.title,
      tasks: [],
    })

    const groupCard = await newGroup.save()

    return response.json({ groupCard })

  }

  async destroy(request, response) {
    const data = request.params

    const groupCard = await GroupCard.findOne({ _id: data.groupId })

    const title = groupCard.title

    await groupCard.delete()

    return response.json({ message: `${title} deleted` })
  }
}

module.exports = new GroupCardController()
