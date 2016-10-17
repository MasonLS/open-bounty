'use strict'
const Sequelize = require('sequelize');
const Project = require('./project');
const User = require('./user');
const db = require('../_db');
const Promise = require('bluebird');

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
	},
    difficulty:{
        type: Sequelize.INTEGER
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
					if (issue.state === 'closed' && this.status !== 'paid') {
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
	},
	classMethods: {
		getForUser: function (githubClient, githubName, userId) {
			return User.findById(userId)
				.then(user => user.getBounties({ include: [Project] }).then(userBounties => Promise.map(userBounties, userBounty => userBounty.getHunters().then(hunters => userBounty.setDataValue('hunters', hunters)))))
				.then(bounties => Promise.map(bounties, bounty => bounty.attachIssue(githubClient, githubName, bounty.project.name)));

		}
	}
});
