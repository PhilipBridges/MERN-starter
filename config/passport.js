const Strategy = require('passport-jwt').Strategy
const Extract = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const keys = require('./keys')

const options = {}

options.jwtFromRequest = Extract.fromAuthHeaderAsBearerToken()
options.secretOrKey = keys.secret

module.exports = passport => {
  passport.use(new Strategy(options, (payload, done) => {
    User.findById(payload.id)
      .then(user => {
        if (user) {
          return done(null, user)
        }
        return done(null, false)
      })
      .catch(err => console.log(err))
  }))
}