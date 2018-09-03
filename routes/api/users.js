const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const validateRegister = require('../../validation/register')
const validateLogin = require('../../validation/login')

const User = require('../../models/User')
const keys = require('../../config/keys')

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegister(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: 'Email already exists' })
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })
      }
    })
})

router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const { errors, isValid } = validateLogin(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'User not found'
        return res.status(404).json(errors)
      }

      bcrypt.compare(password, user.password)
        .then(valid => {
          if (valid) {
            const payload = { id: user.id, name: user.name }
            jwt.sign(
              payload,
              keys.secret,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                })
              })
          } else {
            errors.password = 'Password invalid.'
            return res.status(400).json(errors)
          }
        })
    })
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    joined: req.user.joined
  })
})

module.exports = router