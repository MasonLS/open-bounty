'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('payment', {
    pp_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    intent: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    payment_method: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    currency: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    self_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    approval_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    execute_url: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
