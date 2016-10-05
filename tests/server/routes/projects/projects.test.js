// app
const db = require('../../../../server/db');
const Sequelize = require('sequelize');

// testing tools
const expect = require('chai').expect;
const supertest = require('supertest');

describe('Project Routes', () => {
    let app, Project;
    let agent;

    beforeEach('Sync database', () => db.sync({
        force: true
    }));

    beforeEach('Create app', () => {
        app = require('../../../../server/app')(db);
        Project = db.model('project');
    });

    beforeEach('Create guest agent', () => {
        agent = supertest.agent(app);
    });

    const exampleProject = {
        title: 'Example-Project',
	repoId: 1,
        description: 'This is some serious project.',
        raised: 100,
	paidout: 50,
	ownerId: 0
    };

    beforeEach('Create a review', done => {
        Project.create(exampleProject)
            .then(done);
    });

    it('should get project by id', done => {
        agent.get('/api/projects/one/1')
            .expect(200)
            .end((err, response) => {
                if (err) done(err);
                expect(response.body.title).to.equal(exampleProject.title);
                expect(response.body.description).to.equal(exampleProject.description);
                done();
            });
    });

    // it('should update reviews by id', done => {
    //     agent.put('/api/reviews/1')
    //         .send({
    //             title: 'I changed my mind'
    //         })
    //         .expect(200)
    //         .end((err, response) => {
    //             if (err) done(err);
    //             expect(response.body.title).to.equal('I changed my mind');
    //             expect(response.body.content).to.equal(review.content);
    //             done();
    //         });
    // });
});
