'use strict';
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (app, db) {

    var User = db.model('user');

    var facebookConfig = app.getValue('env').FACEBOOK;

    var facebookCredentials = {
        clientID: facebookConfig.clientID,
        clientSecret: facebookConfig.clientSecret,
        callbackURL: facebookConfig.callbackURL
    };

    var verifyCallback = (accessToken, refreshToken, profile, done) => {

        User.findOne({
                where: {
                    facebook_id: profile.id
                }
            })
            .then(user => {
                if (user) {
                    return user;
                } else {
                    return User.create({
                        facebook_id: profile.id
                    });
                }
            })
            .then(userToLogin => {
                done(null, userToLogin);
            })
            .catch(err => {
                console.error('Error creating user from Facebook authentication', err);
                done(err);
            })

    };

    passport.use(new FacebookStrategy(facebookCredentials, verifyCallback));

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {failureRedirect: '/login'}),
        (req, res) => {
            res.redirect('/');
        });

};
