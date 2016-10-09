'use strict';

const router = require('express').Router();
const path = require('path');
const Promise = require('bluebird');
const Project = require(path.join(__dirname, '../../../db/models/project'));
module.exports = router;

// get all projects for user with repos and bounties
router.get('/', (req, res, next) => {
    Project.findAll({
            where: {
                ownerId: req.user.id
            }
        })
        .then(projects => {
            return Promise.map(projects, project => {
                return project.attachRepoAndBounties(req.github, req.user.githubName);
            })
        })
        .then(projectsWithRepoAndBounties => res.send(projectsWithRepoAndBounties))
        .catch(next);
});

// create a project
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

//find project and attach to req object
router.param('projectId', (req, res, next, projectId) => {
    Project.findById(projectId)
        .then(project => {
            req.project = project;
            next();
        })
        .catch(next);
})

// get single project with repo and bounties
router.get('/:projectId', (req, res, next) => {
    req.project.attachRepoAndBounties(req.github, req.user.githubName)
        .then(projectWithRepoAndBounties => {
            res.send(projectWithRepoAndBounties);
        })
        .catch(next);
});

// update a project and send it back with repo and bounties (and bears! Oh, my!)
router.put('/:projectId', (req, res, next) => {
    req.project.update(req.body)
        .then(updatedProject => {
            return updatedProject.attachRepoAndBounties(req.github, req.user.githubName);
        })
        .then(updatedProjectWithRepoAndBounties => {
            res.send(updatedProjectWithRepoAndBounties);
        })
        .catch(next);
});

router.use('/:projectId/github', require('./github'));