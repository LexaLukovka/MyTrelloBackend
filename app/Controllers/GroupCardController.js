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

    const group = await GroupCard.find()
    const length = group.length
    console.log(length)

    const newGroup = new GroupCard({
      index: length,
      title: data.title,
      tasks: [],
    })

    await newGroup.save()

    return response.json(`${data.title} created`)

  }

  async update(request, response) {
    const data = request.body

    const groupId = data.groupId
    const title = data.title

    await GroupCard.findOneAndUpdate(
      { _id: groupId },
      { title },
      { upsert: true, },
    )

    const groupCard = await GroupCard.find()

    return response.json({ groupCard })
  }

  async save(request, response) {
    const data = request.body

    const startGroup = data.startGroup
    const finishGroup = data.finishGroup || null
    const newGroupCard = data.newGroupCard || null

    if (newGroupCard) {
      newGroupCard.forEach(async group =>
        await GroupCard.findOneAndUpdate(
          { _id: group._id },
          { index: group.index },
        )
      )

      const groupCard = await GroupCard.find()

      return response.json({ groupCard })
    }

    let startId = ''
    let finishId = ''
    let startTasks = []
    let finishTasks = []

    startId = startGroup._id
    startTasks = startGroup.tasks

    if (finishGroup) {
      finishId = finishGroup._id
      finishTasks = finishGroup.tasks
    }

    await GroupCard.findOneAndUpdate(
      { _id: startId },
      { tasks: startTasks },
      { upsert: true, },
    )
    finishGroup && await GroupCard.findOneAndUpdate(
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

    return response.json(`Group card ${title} deleted`)
  }
}

module.exports = new GroupCardController()
