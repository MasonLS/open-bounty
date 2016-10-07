'use strict'
const Sequelize = require('sequelize');

const db = require('../_db');

module.exports = db.define('bounty', {
	issueNumber: {
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
		updateStatus: function (status) {
			this.status = status;
		},
		updateAmount: function (amount) { 
			this.amount += amount; 
		},
		attachIssue: function (githubClient, githubName, projectName) {
			return githubClient.issues.get({
					user: githubName,
					repo: projectName,
					number: this.issueNumber
				})
				.then(issue => {
					this.setDataValue('issue', issue);
					return this;
				})
				.catch(_ => {
					this.setDataValue('issue', []);
					return this;
				});
		}
	},
	classMethods: {
		getByProjectId: projectId => {
			return Bounty.findAll({
				where: {
					projectId: projectId
				}
			})
		}
	}
});