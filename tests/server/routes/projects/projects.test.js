'use strict'

const db = require('../../../../server/db');
const Sequelize = require('sequelize');
const express = require('express');
const projectsRouter = require('../../../../server/app/routes/projects');

// testing tools
const expect = require('chai').expect;
const supertest = require('supertest');


describe('Project Routes', () => {
    let Project,
        User,
        agent,
        testApp;


    // models
    Project = db.model('project');
    User = db.model('user');

    const exampleProject = {
        repoId: 1,
        description: 'wizard',
        ownerId: 1
    };
    const exampleProject2 = {
        repoId: 2,
        description: 'sorceror',
        ownerId: 1
    };

    const exampleProject3 = {
        repoId: 3,
        description: 'monk',
        ownerId: 2
    };

    const exampleUser = {
        isAdmin: false
    }

    const exampleUser2 = {
        isAdmin: false
    }

    beforeEach('Sync database', function() {
        return db.sync({
                force: true
            })
            .then(function() {
                let u1 = User.create(exampleUser);
                let u2 = User.create(exampleUser2);
                return Promise.all([u1, u2]);
            })
            .then(function() {
                // to guarantee id = 1
                return Project.create(exampleProject);
            })
            .then(function() {
                let p2 = Project.create(exampleProject2);
                let p3 = Project.create(exampleProject3);
                return Promise.all([p2, p3])
            })
    });

    beforeEach('Summon test agent', function() {
        testApp = express();
        testApp.use((req, res, next) => {
            req.github = {
                repos: {
                    getById: () => Promise.resolve({
                        id: 1
                    })
                }
            }
            next();
        });
        testApp.use('/api/projects', projectsRouter);
        agent = supertest.agent(testApp);
    });




    it('should get all projects for user', function(done) {
        agent.get('/api/projects/all/owner/1')
            .expect(200)
            .end(function(err, response) {
                if (err) {
                    done(err)
                }
                expect(response.body.length).to.equal(2);
                done();
            })
    });


    it('should get project by id', function(done) {
        agent.get('/api/projects/one/1')
            .expect(200)
            .end(function(err, response) {
                if (err) {
                    done(err);
                }
                expect(response.body.project.description).to.equal(exampleProject.description);
                done();
            });
    });

    // it('should create a project', function(done) {
    //     agent.post('/api/projects/new')
    //         .send(exampleProject2)
    //         .expect(201)
    //         .end((err, response) => {
    //             if (err) {
    //                 done(err);
    //             }
    //             expect('computer').to.equal('computer');
    //         });
    // })
});
