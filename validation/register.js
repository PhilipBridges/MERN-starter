const Validator = require('validator')
const isEmpty = require('./utils')

module.exports = function validateRegister(data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : ''

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters'
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is required.'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required.'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required.'
  }

  if (Validator.isEmpty(data.password)) {
    errors.confirmPassword = 'Confirm password field is required.'
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match.'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid.'
  }

  if (!Validator.isLength(data.password, {min: 6, max: 30})) {
    errors.password = 'Password must be at least 6 characters.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}