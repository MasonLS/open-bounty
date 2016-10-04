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
    console.log('PROFILE', profile)
    User.findOne({
      where: {
        githubId: profile.id
      }
    })
      .then(user => {
        if (user) {
          return user
        } else {
          return User.create({
            githubId: profile.id,
            githubName: profile.username,
            githubToken: accessToken
          })
        }
      })
      .then(userToLogin => {
        userToLogin.token = accessToken
        done(null, userToLogin)
      })
      .catch(err => {
        console.error('Error creating user from GitHub authentication', err)
        done(err)
      })
  }

  passport.use(new GitHubStrategy(githubCredentials, verifyCallback))

  app.get('/auth/github', passport.authenticate('github', { scope: ['user:email']}))

  app.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/login', scope: ['user:email']}),
    (req, res) => {
      console.log('EMAIL', req)
      res.redirect('/')
    })
 }
