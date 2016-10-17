'use strict';

const router = require('express').Router();
const path = require('path');
const Promise = require('bluebird');
const Project = require(path.join(__dirname, '../../../db/models/project'));
const Bounty = require(path.join(__dirname, '../../../db/models/bounty'));
const User = require(path.join(__dirname, '../../../db/models/user'));

module.exports = router;

function getSortedByColumn(model, column, limit, order) {
    return model.findAll({
        limit: limit,
        order: [
            [column, order]
        ]
    });
}

function getProject(bounty) {
    return Project.findById(bounty.projectId)
}

function getBounties(project) {
    return Bounty.findAll({
            where: {
                projectId: project.id
            }
        })
        .then(bounties => {
            project.setDataValue('bounties', bounties);
            return project
        });
}

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
    return req.github.issues.createLabel({
        user: req.user.githubName,
        repo: projectData.name,
        name: 'OpenBounty',
        color: '337ab7'
    }, function() {
        Project.create(projectData)
            .then(project => res.send(project))
            .catch(next);
    })
});

//search projects 
router.get('/search/:searchTerm', (req, res, next) => {
    Project.findAll({
            where: {
                name: {
                    $iLike: `%${req.params.searchTerm}%`
                },
                // ownerId: {
                //     $ne: req.user.id
                // }
            }
        })
        .then(projects => Promise.map(projects, project => project.attachRepo(req.github, req.user.githubName)))
        .then(projectsWithRepos => Promise.map(projectsWithRepos, project => project.attachBounties(req.github, req.user.githubName)))
        .then(res.json.bind(res))
        .catch(next);
});

// get featured projects for homepage
router.get('/featured', (req, res, next) => {
    getSortedByColumn(Bounty, 'updatedAt', 30, 'DESC')
        .then(bounties => Promise.all(bounties.map(getProject))
            .then(projects => Promise.all(projects.map(getBounties)))
            .then(projectsWithBounties => Promise.all(projectsWithBounties.map(project => {
                return req.github.repos.getById({
                    id: project.repoId
                }).then(repo => {
                    project.setDataValue('repo', repo)
                    return project;
                })
            })))
            .then(projectWithRepoAndBounties => res.send(projectWithRepoAndBounties)))
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

// get issues for project
router.get('/:projectId/issues', (req, res, next) => {
    Project.findById(req.params.projectId)
        .then(project => {
            return req.github.issues.getForRepo({
                user: req.user.githubName,
                owner: req.user.githubName,
                repo: project.name
            })
        })
        .then(issues => {
            res.send(issues);
        })
        .catch(next)
});

router.use('/:projectId/github', require('./github'));
