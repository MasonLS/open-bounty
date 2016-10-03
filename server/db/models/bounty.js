'use strict'
const Sequelize = require('sequelize');

const db = require('../_db');

module.exports = db.define('bounty', {
	issueId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	status: {
		type: Sequelize.ENUM('open', 'pull request', 'paid', 'deleted')
	},
	amount: {
		type: Sequelize.FLOAT
	}
},{
	instanceMethods: {
		updateStatus: status => this.status = status,
		updateAmount: amount => this.amount += amount
	}
});