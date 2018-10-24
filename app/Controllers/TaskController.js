const GroupCard = require('../Models/GroupCard')
const Task = require('../Models/Task')

class TaskController {
  async store(request, response) {
    const data = request.body

    const newTask = new Task({
      task: data.task,
      description: '',
      dueDates: '',
    })

    const task = await newTask.save()

    const group = await GroupCard.findOne({ _id: data.groupId })

    const groupTask = group.tasks
    groupTask.unshift(task)

    const groupCard = await GroupCard.findOneAndUpdate(
      { _id: data.groupId, },
      { tasks: groupTask },
      { upsert: true, },
    )

    return response.json({ groupCard, task })
  }

  async update(request, response) {
    const data = request.body

    const taskId = data.taskId
    const groupId = data.groupId

    const taskOld = await Task.findOne({ _id: taskId })

    const task = data.task || taskOld.task
    const description = data.description || taskOld.description
    const dueDates = data.dueDates || taskOld.dueDates

    await Task.findOneAndUpdate(
      { _id: taskId },
      {
        task,
        description,
        dueDates,
      },
      { upsert: true, },
    )

    const groupCards = await GroupCard.findOne({ _id: groupId })

    const tasks = []
    groupCards.tasks.map(function add(taska) {
      if (taska._id == taskId) {
        taska.task = task
        taska.description = description
        taska.dueDates = dueDates
        tasks.push(taska)
      }
      else tasks.push(taska)
    })

    await GroupCard.findOneAndUpdate(
      { _id: groupId },
      { tasks },
      { upsert: true, },
    )

    const groupCard = await GroupCard.findOne({ _id: groupId })

    return response.json({ groupCard, task })
  }

  async destroy(request, response) {
    const data = request.params
    const taskId = data.taskId
    const groupId = data.groupId

    const task = await Task.findOne({ _id: taskId })

    const title = task.task

    await task.delete()

    const groupCards = await GroupCard.findOne({ _id: groupId })
    const tasks = []
    groupCards.tasks.map(function add(task) {
      if (task._id != taskId) {
        tasks.push(task)
      }
    })

    await GroupCard.findOneAndUpdate(
      { _id: groupId },
      { tasks },
      { upsert: true, },
    )

    return response.json({ message: `Task ${title} deleted` })
  }
}

module.exports = new TaskController()
