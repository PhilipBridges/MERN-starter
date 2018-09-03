const Validator = require('validator')
const isEmpty = require('./utils')

module.exports = function validatePost(data) {
  let errors = {}

  data.text = !isEmpty(data.text) ? data.text : ''

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text is required.'
  }

  if (!Validator.isLength(data.text, {min: 10, max: 300})){
    errors.text = 'Post must be between 10 and 300 characters'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}