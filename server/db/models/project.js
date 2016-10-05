'use strict'
const Sequelize = require('sequelize')

const db = require('../_db')

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
});
