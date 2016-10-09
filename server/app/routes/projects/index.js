'use strict';

const router = require('express').Router();

const path = require('path');
const Promise = require('bluebird');

const Project = require(path.join(__dirname, '../../../db/models/project'));

// get all projects for user -------- It's goood-----
router.get('/', (req, res, next) => {
    Project.findAll({
            where: {
                ownerId: req.user.id
            }
        })
        .then(projects => Promise.map(projects, project => project.attachBounties()))
        .then(projectsWithBounties => res.send(projectsWithBounties))
        .catch(next);
});

// create project
router.post('/', (req, res, next) => {
    const projectData = req.body;
    projectData.ownerId = req.user.id;

    Project.create(projectData)
        .then(project => {
            console.log(project)
            res.json(project);
        })
        .catch(next);
});


router.get('/:projectName/issues', (req, res, next) => {
    req.github.issues.getForRepo({
            user: req.user.githubName,
            repo: req.params.projectName
        })
        .then(issues => {
            console.log(issues)
            res.send(issues)
        })
        .catch(next);
});

router.param('projectId', (req, res, next, projectId) => {
    Project.findById(projectId)
        .then(project => {
            req.project = project;
            next();
        })
        .catch(next);
})

// get single project
router.get('/one/:projectId', (req, res, next) => {
    const response = {}
    Project.findById(req.params.projectId)
        .then(project => {
            response.project = project
            return req.github.repos.getById({
                    id: project.repoId
                })
                .then(repo => {
                    response.repo = repo
                    res.json(response);
                });
        })
        .catch(next);
});

router.use('/github', require('./github'));

module.exports = router;
