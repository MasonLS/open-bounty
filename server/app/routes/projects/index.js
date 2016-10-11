'use strict';

const router = require('express').Router();
const path = require('path');
const Promise = require('bluebird');
const Project = require(path.join(__dirname, '../../../db/models/project'));
const Bounty = require(path.join(__dirname, '../../../db/models/bounty'));
const User = require(path.join(__dirname, '../../../db/models/user'));
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
            res.send(project);
        })
        .catch(next);
});

//search projects 
router.get('/search/:searchTerm', (req, res, next) => {
    Project.findAll({
            where: {
                name: {
                    $iLike: `%${req.params.searchTerm}%`
                },
                ownerId: {
                    $ne: req.user.id
                }
            },
            include: [Bounty]
        })
        .then(res.json.bind(res))
        .catch(next);
});

// put project with repo and bounties on req object
router.param('projectId', (req, res, next, projectId) => {
    Project.findById(projectId)
        .then(project => project.attachRepoAndBounties(req.github, req.user.githubName))
        .then(projectWithRepoAndBounties => {
            req.project = projectWithRepoAndBounties;
            next();
        })
        .catch(next);
})

// get single project with repo and bounties
router.get('/:projectId', (req, res, next) => {
    res.send(req.project);
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