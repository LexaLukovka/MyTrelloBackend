module.exports = class RegisterUser {
  get rules() {
    return {
      name: 'required',
      email: 'required|email|unique_email',
      password: 'required|min:6|max:30'
    }
  }

  get messages() {
    return {
      'email.unique_email': 'Такой пользователь уже зарегистрирован!',
      'email.required': 'Введите email пожалуйста',
      'email.email': 'Неправильный email',
      'password.required': 'Введите пароль пожалуйста',
      'password.min': 'Пароль должен быть не меньше 6 символов',
      'password.max': 'Пароль должен быть не больше 30 символов',
    }
  }
}
