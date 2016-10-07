'use strict'
const Sequelize = require('sequelize');
const Promise = require('bluebird');

const db = require('../_db');

module.exports = db.define('project', {
    repoId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    raised: {
        type: Sequelize.FLOAT,
        defaultValue: 0.00
    },
    paidOut: {
        type: Sequelize.FLOAT,
        defaultValue: 0.00
    }
},{
    instanceMethods: {
        attachBounties: function (githubClient, githubName) {
            return this.getBounties()
                .then(bounties => {
                    console.log('BOUNTIES !!!!', bounties)
                    return Promise.map(bounties, bounty => {
                        return bounty.attachIssue(githubClient, githubName, this.name);
                    });
                })
                .then(bountiesWithIssue => {
                    this.setDataValue('bounties', bountiesWithIssue);
                    return this;
                })
                
        }
    }
});
