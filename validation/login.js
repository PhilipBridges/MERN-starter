const Validator = require('validator')
const isEmpty = require('./utils')

module.exports = function validateLogin(data) {
  let errors = {}

  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required.'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required.'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}