'use strict'
const crypto = require('crypto');
const _ = require('lodash');
const Sequelize = require('sequelize');
const GitHubApi = require('github');
const github = new GitHubApi();

const db = require('../_db');

module.exports = db.define('user', {
    isAdmin: {
        type: Sequelize.BOOLEAN
    },
    paypalEmail: {
        type: Sequelize.STRING
    },
    githubId: {
        type: Sequelize.INTEGER
    },
    githubName: {
        type: Sequelize.STRING
    },
    githubPic: {
        type: Sequelize.TEXT
    },
    githubToken: {
        type: Sequelize.STRING
    },
    githubEmail: {
        type: Sequelize.STRING
    },
    glory: {
        type: Sequelize.INTEGER
    }
},{
    instanceMethods: {
        sanitize: function () {
            return _.omit(this.toJSON(), ['password', 'salt']);
        },
        correctPassword: function (candidatePassword) {
            return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
        },
        incrementGlory: function (amountOfGlory) {
            this.glory =+ amountOfGlory;
        }
    },
    classMethods: {
        generateSalt: function () {
            return crypto.randomBytes(16).toString('base64');
        },
        encryptPassword: function (plainText, salt) {
            var hash = crypto.createHash('sha1');
            hash.update(plainText);
            hash.update(salt);
            return hash.digest('hex');
        }
    },
    hooks: {
        beforeCreate: setSaltAndPassword,
        beforeUpdate: setSaltAndPassword,
        afterCreate: function (user) {
            if (user.githubToken) {
                github.authenticate({
                    type: 'oauth',
                    token: user.githubToken
                });
                github.users.getEmails({})
                    .then(response => {
                        response.forEach(emailObj => {
                            if (emailObj.primary) {
                                return user.update({
                                        githubEmail: emailObj.email
                                       });
                            }
                        })
                    })
                    .catch(console.error);
            }
        }
    }
});

function setSaltAndPassword(user) {
    if (user.changed('password')) {
        user.salt = user.Model.generateSalt();
        user.password = user.Model.encryptPassword(user.password, user.salt);
    }
}