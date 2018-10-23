module.exports = class GroupCard {
  get rules() {
    return {
      title: 'required',
    }
  }

  get messages() {
    return {
      'title.required': 'Введите title пожалуйста',
    }
  }
}
