const expect = require('chai').expect;
const Promise = require('bluebird');

const db = require('../../../server/db');
const Project = db.model('project');

describe('Project model', () => {

	beforeEach('Sync DB', () => {
		return db.sync({ force: true });
	});

	describe('instance methods', () => {

		const githubClient = {
			repos: {
				get: (queryObj) => Promise.resolve({})
			}
		}

		const githubName = 'fakeGHUser';

		let testProject;

		beforeEach('create a project instance', () => {
			return Project.create({ repoId: 1, name: 'fakeProject' })
				.then(project => testProject = project);
		});

		afterEach('destroy the project instance', () => testProject.destroy());

		describe('attachRepo method', () => {
			
			it('should be a function', () => {
				expect(testProject.attachRepo).to.be.a('function');
			});

			it('should return the project instance with a repo object attached', (done) => {
				testProject.attachRepo(githubClient, githubName)
					.then(projectWithRepo => {
						projectWithRepo = projectWithRepo.toJSON();
						expect(projectWithRepo).to.have.property('repo');
						expect(projectWithRepo.repo).to.be.an('object');
						done();
					})
					.catch(done);
			});

		});

		describe('attachBounties method', () => {

			it('should be a function', () => {
				expect(testProject.attachBounties).to.be.a('function');
			});

			it('should return the project instance with a bounties array attached', (done) => {
				testProject.attachBounties(githubClient, githubName)
					.then(projectWithBounties => {
						projectWithBounties = projectWithBounties.toJSON();
						expect(projectWithBounties).to.have.property('bounties');
						expect(projectWithBounties.bounties).to.be.an('array');
						done();
					})
					.catch(done);
			});
		});

		describe('attachRepoAndBounties method', () => {

			it('should be a function', () => {
				expect(testProject.attachRepoAndBounties).to.be.a('function');
			});

			it('should return the project instance with a repo AND and array of bounties attached', (done) => {
				testProject.attachRepoAndBounties(githubClient, githubName)
					.then(projectWithRepoAndBounties => {
						projectWithRepoAndBounties = projectWithRepoAndBounties.toJSON();
						expect(projectWithRepoAndBounties).to.have.property('repo');
						expect(projectWithRepoAndBounties.repo).to.be.an('object');
						expect(projectWithRepoAndBounties).to.have.property('bounties');
						expect(projectWithRepoAndBounties.bounties).to.be.an('array');
						done();
					})
					.catch(done);
			});
		});

	});

});