const GroupCard = require('../Models/GroupCard')
const Task = require('../Models/Task')

class TaskController {
  async store(request, response) {
    const data = request.body

    const newTask = new Task({
      task: data.task,
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

    await Task.findOneAndUpdate(
      { _id: taskId },
      { task: data.task },
      { upsert: true, },
    )
    const task = await Task.findOne({ _id: taskId })

    const groupCards = await GroupCard.findOne({ _id: groupId })
    const tasks = []
    groupCards.tasks.map(function add(task) {
      if (task._id == taskId) {
        task.task = data.task
        tasks.push(task)
      }
      else tasks.push(task)
    })

    await GroupCard.findOneAndUpdate(
      { _id: groupId },
      { tasks },
      { upsert: true, },
    )

    const groupCard = await GroupCard.findOne({ _id: groupId })

    return response.json({ groupCard, task })
  }
}

module.exports = new TaskController()
