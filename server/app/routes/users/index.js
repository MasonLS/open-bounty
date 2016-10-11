'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db');
const User = db.model('user');
const request = require('request');
const Project = db.model('project');
const Promise = require('bluebird');
module.exports = router;

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

//get all users
router.get('/', (req, res, next) => {
    User.findAll()
        .then(users => {
            res.send(users);
        })
        .catch(next);
});

//create and return newly created user row
router.post('/', (req, res, next) => {
    User.create(req.body)
        .then(user => {
            res.status(201).send(user);
        })
        .catch(next);
});

router.get('/starred', (req, res, next) => {
    req.github.activity.getStarredReposForUser({
            user: req.user.githubName
        })
        .then(repos => {
            let starredRepoIds = repos.map(repo => repo.id);

            return Project.findAll({
                where: {
                    repoId: {
                        $in: starredRepoIds
                    },
                    ownerId: {
                        $ne: req.user.id
                    }
                },
            })
        })
        .then(starredProjects => {
            return Promise.map(starredProjects, project => {
                return project.attachRepoAndBounties(req.github, req.user.githubName);
            })
        })
        .then(starredProjectsWithRepoAndBounties => {
            res.json(starredProjectsWithRepoAndBounties);
        })
        .catch(next);
});

router.put('/', (req, res, next) => {
    req.user.update(req.body)
        .then(updatedUser => {
            res.send(updatedUser);
        })
        .catch(next);
});

router.delete('/', (req, res, next) => {
    req.user.destroy()
        .then(_ => {
            res.sendStatus(204);
        })
        .catch(next);
});

router.use('/github', require('./github'));