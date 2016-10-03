'use strict'
const Sequelize = require('sequelize')

const db = require('../_db')

module.exports = db.define('project', {
	repoId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT
	},
	raised: {
		type: Sequelize.FLOAT
	},
	paidOut: {
		type: Sequelize.FLOAT	
	}
});