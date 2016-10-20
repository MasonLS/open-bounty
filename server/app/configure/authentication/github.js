'use strict';

const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy
const GitHubApi = require('github');

module.exports = (app, db) => {
    let User = db.model('user')

    let githubConfig = app.getValue('env').GITHUB

    let githubCredentials = {
        clientID: githubConfig.clientID,
        clientSecret: githubConfig.clientSecret,
        callbackURL: githubConfig.callbackURL
    }

    const verifyCallback = (accessToken, refreshToken, profile, done) => {

        User.findOne({
                where: {
                    githubId: profile.id
                }
            })
            .then(user => {
                if (user) {
                    return user.update({
                        githubToken: accessToken
                    })
                } else {
                    return User.create({
                        githubId: profile.id,
                        githubName: profile.username,
                        githubToken: accessToken,
                        githubPic: profile.photos[0].value,
                        name: profile.displayName,
                        githubUrl: profile._json.html_url
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

    app.get('/auth/github', passport.authenticate('github', { scope: ['user:email', 'repo'] }))

    app.get('/auth/github/callback',
        passport.authenticate('github', { failureRedirect: '/', scope: ['user:email'] }),
        (req, res) => {
            res.redirect('/')
        })
}
