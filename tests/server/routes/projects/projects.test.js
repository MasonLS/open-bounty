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
	agent,
	testApp;

    beforeEach('Sync database', () => db.sync({
        force: true
    }));

    beforeEach('Create app', () => {
        Project = db.model('project');
    });

    beforeEach('Summon test agent', () => {
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

    const exampleProject = {
        repoId: 2,
        description: 'This is some serious project.',
        raised: 1000,
        paidout: 500,
        ownerId: 1
    };

    beforeEach('create a project', () => Project.create(exampleProject));

    it('should get project by id', done => {
        agent.get('/api/projects/one/1')
            .expect(200)
            .end((err, response) => {
                if (err) done(err);
                expect(response.body.project.raised).to.equal(exampleProject.raised);
                expect(response.body.project.description).to.equal(exampleProject.description);
                done();
            });
    });
});
