'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('donation', {
    ppId: {
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
    paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.FLOAT,
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
    selfUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        isUrl: true
    },
    approvalUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    executeUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    token: {
        type: Sequelize.STRING
    },
    payerId: {
        type: Sequelize.STRING
    },
    paypalEmail: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    donorName: {
        type: Sequelize.STRING
    },
    donationAnonymous: {
        type: Sequelize.BOOLEAN
    }

});
