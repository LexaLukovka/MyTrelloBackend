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

    const task = await Task.findOneAndUpdate(
      { _id: data.taskId },
      { task: data.task },
      { upsert: true, },
    )
console.log(task)
    const groupCard = await GroupCard.findOneAndUpdate(
      { _id: data.groupId, },
      { tasks: task },
      { upsert: true, },
    )
console.log(groupCard)
    return response.json({groupCard, task })
  }
}

module.exports = new TaskController()
