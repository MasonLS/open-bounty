'use strict'
const Sequelize = require('sequelize');

const db = require('../_db');

module.exports = db.define('user', {
    paypalEmail: {
        type: Sequelize.STRING
    },
    githubId: {
        type: Sequelize.STRING
    },
});
