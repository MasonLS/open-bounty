'use strict';

const Sequelize = require('sequelize');
const Promise = require('bluebird');

const db = require('../_db');

module.exports = db.define('project', {
    repoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING
    },
    language: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    fundsOnHold: {
        type: Sequelize.FLOAT,
        defaultValue: 0.00
    },
    raised: {
        type: Sequelize.FLOAT,
        defaultValue: 0.00
    },
    paidOut: {
        type: Sequelize.FLOAT,
        defaultValue: 0.00
    }
}, {
    instanceMethods: {
        attachRepo: function(githubClient, githubName) {
            return githubClient.repos.get({
                    user: githubName,
                    repo: this.name
                })
                .then(repo => {
                    this.setDataValue('repo', repo);
                    return this;
                })
        },
        attachBounties: function(githubClient, githubName) {
            return this.getBounties()
                .then(bounties => {
                    return Promise.map(bounties, bounty => {
                        return bounty.attachIssue(githubClient, githubName, this.name);
                    });
                })
                .then(bountiesWithIssue => {
                    this.setDataValue('bounties', bountiesWithIssue);
                    return this;
                })

        },
        attachRepoAndBounties: function(githubClient, githubName) {
            return this.attachRepo(githubClient, githubName)
                .then(projectWithRepo => {
                    return this.attachBounties(githubClient, githubName)
                });
        }
    }
});
