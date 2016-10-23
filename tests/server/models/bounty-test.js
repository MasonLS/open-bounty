'use strict';

const expect = require('chai').expect;
const Promise = require('bluebird');

const db = require('../../../server/db');
const Bounty = db.model('bounty');
const Project = db.model('project');
const User = db.model('user');

describe('Bounty model', () => {

	function FakeGHClient (issueObj) {
		this.issues = {
				get: (queryObj) => Promise.resolve(issueObj)
			}
	}

	const githubName = 'fakeGHUser';

	beforeEach('Sync DB', () => {
		return db.sync({ force: true });
	});

	let testProject;

	beforeEach('create a project instance', () => {
		return Project.create({ 
				repoId: 1, 
				name: 'fakeProject'
			})
			.then(project => testProject = project);
	});

	afterEach('destroy the test project', () => testProject.destroy());

	describe('instance methods', () => {

		let testBounty;

		beforeEach('create a bounty instance', () => {
			return Bounty.create({ issueNumber: 1, issueId: 1, amount: 50.00 })
				.then(bounty => testBounty = bounty);
		});
		
		beforeEach('associate test project with test bounty', () => testBounty.setProject(testProject));
		
		afterEach('destroy the bounty instance', () => testBounty.destroy());

		describe('attachIssue method', () => {
			
			it('should be a function', () => {
				expect(testBounty.attachIssue).to.be.a('function');
			});

			let githubClient = new FakeGHClient({});

			it('should return the bounty instance with an issue object attached', (done) => {
				testBounty.attachIssue(githubClient, githubName, testProject.name)
					.then(bountyWithIssue => {
						bountyWithIssue = bountyWithIssue.toJSON();
						expect(bountyWithIssue).to.have.property('issue');
						expect(bountyWithIssue.issue).to.be.an('object');
						done();
					})
					.catch(done);
			});

			it('should update the bountys status to "pull request" if the issue is closed', (done) => {
				githubClient = new FakeGHClient({ state: 'closed' });
				testBounty.attachIssue(githubClient, githubName, testProject.name)
					.then(bounty => {
						expect(bounty.status).to.equal('pull request');
						done();
					})
					.catch(done);
			});

		});

		describe('updateAmount method', () => {

			let githubClient = new FakeGHClient({});

			it('should be a function', () => {
				expect(testBounty.updateAmount).to.be.a('function');
			});

			it('should update the bountys amount property', (done) => {
				testBounty.updateAmount(100)
					.then(updatedBounty => {
						return Bounty.findOne({
							where: {
								issueNumber: 1
							}
						})
					})
					.then(updatedBounty => {
						expect(updatedBounty.amount).to.equal(100);
						done();
					})
					.catch(done);
			});

			it('should also update the fundsOnHold prop of the project associated with the bounty', (done) => {
				testBounty.updateAmount(100)
					.then(() => {
						return testBounty.getProject();
					})
					.then(project => {
						expect(project.fundsOnHold).to.equal(50);
						done();
					})
					.catch(done);
			});

		});

	});

	describe('class methods', () => {

		describe('getForUser method', () => {

			const userObj = {
				githubId: 1,
				githubName: 'BObama',
				githubToken: 'r3al7yfak3'
			}

			const someBounties = [
				{
					issueNumber: 1, 
					issueId: 1, 
					amount: 50.00
				},
				{
					issueNumber: 2, 
					issueId: 2, 
					amount: 100.00
				}
			]

			let testUser;

			beforeEach('create a user', () => {
				return User.create(userObj)
					.then(createdUser => testUser = createdUser);
			});

			let testBounties;

			beforeEach('create some bounties', () => {
				return Bounty.bulkCreate(someBounties)
					.then(bounties => {
						return Bounty.findAll();		
					})
					.then(bounties => testBounties = bounties);
			});

			beforeEach('associate test bounties with test project and test user', () => {
				return Promise.map(testBounties, testBounty => testBounty.setProject(testProject))
					.then(() => {
						return testUser.setBounties(testBounties);
					});
			});

			afterEach('destroy test user and bounties', () => {
				return testUser.getBounties()
					.then(bounties => {
						return Promise.map(bounties, bounty => bounty.destroy());
					})
					.then(() => {
						return testUser.destroy();
					});
			});

			it('should be a function', () => {
				expect(Bounty.getForUser).to.be.a('function');
			});

			let githubClient = new FakeGHClient({});

			it('should return an array of the users bounties', (done) => {
				Bounty.getForUser(githubClient, githubName, testUser.id)
					.then(userBounties => {
						expect(userBounties.length).to.equal(testBounties.length);
						done();
					})
					.catch(done);
			});

		});
	});

});