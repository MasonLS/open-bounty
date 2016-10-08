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

router.get('/repos', (req, res, next) => {
    req.github.repos.getForUser({
            user: req.user.githubName
        })
        .then(repos => {
            res.send(repos);
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
                    }
                },
            })
        })
        .then(starredProjects => {
            return Promise.map(starredProjects, project => {
                return project.attachBounties(req.github, req.user.githubName);
            })
        })
        .then(starredProjectsWithBounties => {
            res.json(starredProjectsWithBounties);
        })
        .catch(next);
});

// router.param('userId', (req, res, next, userId) => {
//     User.findById(req.params.userId)
//         .then(user => {
//             req.userSought = user;
//             next();
//         })
//         .catch(next);
// });

//get one, put one, delete one routes

router.get('/:userId', (req, res, next) => {
    res.send(req.userSought);
});

router.put('/:userId', (req, res, next) => {
    req.userSought.update(req.body)
        .then(_ => {
            res.sendStatus(204);
        })
        .catch(next);
});

router.delete('/:userId', (req, res, next) => {
    req.userSought.destroy()
        .then(_ => {
            res.sendStatus(204);
        })
        .catch(next);
});

router.use('/github', require('./github'));



