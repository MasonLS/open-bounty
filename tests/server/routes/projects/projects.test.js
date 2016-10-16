'use strict'

const db = require('../../../../server/db');
const Sequelize = require('sequelize');
const express = require('express');
const projectsRouter = require('../../../../server/app/routes/projects');

// testing tools
const expect = require('chai').expect;
const supertest = require('supertest');

describe('Project Routes', () => {
    let agent,
        testApp,
        githubCall,
	projectIssue;

    // models
    const Project = db.model('project');
    const User = db.model('user');
    const Bounty = db.model('bounty');

    const exampleProject = {
        repoId: 1,
	name: 'wizard',
        description: 'spells as category theory',
        ownerId: 1
    };

    const numOfProjects = 10;

    function createProjects() {
        const projects = [];
        let repoId = 4,
            description = 'description ';
        for (let i = 0; i < numOfProjects; i++) {
            projects.push({
                repoId: repoId,
                description: description + repoId,
                ownerId: 2
            })
            repoId++;
        }
        return projects;
    }

    const exampleUser = {
	name: 'one',
        isAdmin: false
    }

    const exampleUser2 = {
	name: 'two',
        isAdmin: false
    }
    const bounty = {
	issueNumber: 777,
	issueId: 22222,
	projectId: 1
    }

    projectIssue = {
	issue: 'issue'
    }

    beforeEach('Sync database', function() {
        return db.sync({
                force: true
            })
            .then(function() {
                const u1 = User.create(exampleUser);
                const u2 = User.create(exampleUser2);
                return Promise.all([u1, u2]);
            })
            .then(function() {
                // to guarantee id = 1
                return Project.create(exampleProject);
            })
            .then(function() {
                const projects = createProjects()
                    .map(project => Project.create(project));
                return Promise.all(projects)
            })
	    .then(() => Bounty.create(bounty))
    });

    beforeEach('Summon test agent', function() {

	const githubCallCreator = function(value) {
	    return function() {
		return Promise.resolve(value);
	    }
	}

        githubCall = () => Promise.resolve(true)

        testApp = express();
        testApp.use((req, res, next) => {

            // intercept github api calls
            req.github = {
                repos: {
                    getById: githubCall,
                    get: githubCall
                },
                issues: {
                    getForRepo: githubCallCreator(projectIssue),
		    createLabel: githubCall,
		    get: githubCall
                },
                search: {
                    issues: githubCall
                }
            }

            req.user = {
                id: 2,
                githubName: 'wizard'
            };

	    req.project = {
		id: 1,
		name: 'wizard'
	    }
            next();
        });

        testApp.use('/api/projects', projectsRouter);

        agent = supertest.agent(testApp);
    });

    it('gets all projects for user', function(done) {
        agent.get('/api/projects')
            .expect(200)
            .end(function(err, response) {
                if (err) {
                    done(err)
                } else {
                    expect(response.body.length).to.equal(numOfProjects);

                    done();
                }
            })
    });

    it('gets projects by search term', function(done) {
        agent.get(`/api/projects/search/${exampleProject.name}`)
            .expect(200)
            .end(function(err, response) {
                if (err) {
                    done(err);
                } else {
                    expect(response.body[0].description).to.equal(exampleProject.description);
                    done();
                }
            });
    });

    it('gets project by id', function(done) {
        agent.get('/api/projects/1')
            .expect(200)
            .end(function(err, response) {
                if (err) {
                    done(err);
                } else {
                    expect(response.body.description).to.equal(exampleProject.description);
                    done();
                }
            });
    });

    it('gets an array of projects', function(done) {
        agent.get('/api/projects/featured')
            .expect(200)
            .end(function(err, response) {
                if (err) {
                    done(err);
                } else {
                    expect(Array.isArray(response.body)).to.equal(true);
		    expect(response.body[0].name).to.equal(exampleProject.name)
                    done();
                }
            });
    });

    it('gets issues for project', function(done) {
        agent.get('/api/projects/1/issues')
            .expect(200)
            .end(function(err, response) {
                if (err) {
                    done(err);
                } else {
                    expect(response.body.issue).to.equal(projectIssue.issue);
                    done();
                }
            });
    });

});
