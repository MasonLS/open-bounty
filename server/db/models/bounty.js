'use strict'
const Sequelize = require('sequelize');

const db = require('../_db');

module.exports = db.define('bounty', {
	issueNumber: {
		type: Sequelize.INTEGER
	},
	issueId: {
		type: Sequelize.INTEGER,
		unique: true
	},
	status: {
		type: Sequelize.ENUM('open', 'pull request', 'paid', 'deleted'),
        defaultValue: 'open'
	},
	amount: {
		type: Sequelize.FLOAT
	}
},{
	instanceMethods: {
		attachIssue: function (githubClient, githubName, projectName) {
			return githubClient.issues.get({
					user: githubName,
					repo: projectName,
					number: this.issueNumber
				})
				.then(issue => {
					if (issue.state === 'closed') {
						return this.update({ status: 'pull request' })
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
	    updateAmount: function (newAmount) {
		const oldAmount = this.amount;
			return this.update({
				amount: newAmount
			})
			.then(updatedBounty => {
				return updatedBounty.getProject()
			})
			.then(bountyProject => {
			    const newFundsOnHold = Number(bountyProject.fundsOnHold) - Number(oldAmount) + Number(newAmount);
				return bountyProject.update({
				    fundsOnHold: newFundsOnHold
				});
			})
		}
	}
});
