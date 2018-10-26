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
    const newGroupCard = data.newGroupCard || null

    if (newGroupCard) {

      // const prob = await GroupCard.update({}, newGroupCard, { multi: true })
      // console.log(prob)

      const prob = await newGroupCard.forEach(async function add(groups) {
        await GroupCard.findOneAndUpdate(
          { _id: groups._id },
          {
            _id: groups._id,
            tasks: groups.tasks,
            title: groups.title,
          },
          { multi: true }
        )
      })
      console.log(prob)
      const groupCard = await GroupCard.find()
      console.log(groupCard)

      return response.json({ groupCard })
    }

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
