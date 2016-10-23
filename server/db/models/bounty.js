'use strict';

const Sequelize = require('sequelize');
const Project = require('./project');
const User = require('./user');
const db = require('../_db');
const Promise = require('bluebird');

module.exports = db.define('bounty', {
    issueNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    issueId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    issueTitle: {
        type: Sequelize.STRING
    },
    issueUrl: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.ENUM('open', 'pull request', 'paid', 'deleted'),
        defaultValue: 'open'
    },
    amount: {
        type: Sequelize.FLOAT
    },
    difficulty: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1,
            max: 10
        }
    }
}, {
    instanceMethods: {
        attachIssue: function(githubClient, githubName, projectName) {
            return githubClient.issues.get({
                    user: githubName,
                    repo: projectName,
                    number: this.issueNumber
                })
                .then(issue => {
                    if (issue.state === 'closed' && this.status !== 'paid') {
                        return this.update({
                                status: 'pull request'
                            })
                            .then(updatedBounty => {
                                updatedBounty.setDataValue('issue', issue);
                                return updatedBounty;
                            });
                    } else {
                        this.setDataValue('issue', issue);
                        return this;
                    }
                })
                .catch(_ => {
                    this.setDataValue('issue', []);
                    return this;
                });
        },
        updateAmount: function(newAmount) {
            const oldAmount = this.amount;
            return this.update({
                    amount: newAmount
                })
                .then(updatedBounty => {
                    return updatedBounty.getProject();
                })
                .then(bountyProject => {
                    const newFundsOnHold = bountyProject.fundsOnHold - oldAmount + newAmount;
                    return bountyProject.update({
                        fundsOnHold: newFundsOnHold
                    });
                });
        }
    },
    classMethods: {
        getForUser: function(githubClient, githubName, userId) {
            return User.findById(userId)
                .then(user => user.getBounties({
                        include: [Project]
                    })
                    .then(bounties => Promise.map(bounties, bounty => {
                        return bounty.attachIssue(githubClient, githubName, bounty.project.name);
                    })));

        }
    }
});
