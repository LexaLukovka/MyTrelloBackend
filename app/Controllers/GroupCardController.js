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

  async update(request, response) {
    const data = request.body

    const start = data.start
    const finish = data.finish || null

    let startId = ''
    let finishId = ''
    let startTasks = []
    let finishTasks = []

    startId = start._id
    startTasks = start.tasks

    if (finish) {
      finishId = finish._id
      finishTasks = finish.tasks
    }

    await GroupCard.findOneAndUpdate(
      { _id: startId },
      { tasks: startTasks },
      { upsert: true, },
    )
    finish && await GroupCard.findOneAndUpdate(
      { _id: finishId },
      { tasks: finishTasks },
      { upsert: true, },
    )

    const groupCard = await GroupCard.find()

    return response.json({ groupCard })
  }

  async destroy(request, response) {
    const data = request.params

    const groupCard = await GroupCard.findOne({ _id: data.groupId })

    const title = groupCard.title

    await groupCard.delete()

    return response.json({ message: `Group card ${title} deleted` })
  }
}

module.exports = new GroupCardController()
