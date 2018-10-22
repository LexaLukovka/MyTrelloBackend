module.exports = class LoginUser {
  get rules() {
    return {
      email: 'required|email|email_exists',
      password: 'required|min:6|max:30|matches_email'
    }
  }

  get messages() {
    return {
      'email.email_exists': 'Пользователь с такой почтой на найден',
      'email.required': 'Введите email пожалуйста',
      'email.email': 'Неправильный email',
      'password.required': 'Введите пароль пожалуйста',
      'password.min': 'Пароль должен быть не меньше 6 символов',
      'password.max': 'Пароль должен быть не больше 30 символов',
      'password.matches_email': 'Неправильный пароль'
    }
  }
}
