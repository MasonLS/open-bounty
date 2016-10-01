'use strict'
var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy

module.exports = function (app, db) {
  var User = db.model('user')

  var githubConfig = app.getValue('env').GITHUB

  var githubCredentials = {
    clientID: githubConfig.clientID,
    clientSecret: githubConfig.clientSecret,
    callbackURL: githubConfig.callbackURL
  }

  var verifyCallback = (accessToken, refreshToken, profile, done) => {

    User.findOne({
      where: {
        github_id: profile.id
      }
    })
      .then(user => {
        if (user) {
          return user
        } else {
          return User.create({
            github_id: profile.id
          })
        }
      })
      .then(userToLogin => {
        done(null, userToLogin)
      })
      .catch(err => {
        console.error('Error creating user from GitHub authentication', err)
        done(err)
      })
  }

  passport.use(new GitHubStrategy(githubCredentials, verifyCallback))

  app.get('/auth/github', passport.authenticate('github'))

  app.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    (req, res) => {
      res.redirect('/')
    })
}
