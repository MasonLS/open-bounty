'use strict';

const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db');
const Project = db.model('project');
const Promise = require('bluebird');
module.exports = router;

// for filtering out user repos already created as projects
const filterByProp = (objectA, objectB) => {
    return objectA.filter(element => {
        if (Object.keys(objectB).length > 0) {
            for (let key in objectB) {
                return element.name !== objectB[key].name
            }
        }
    })
};

// sends back an array(.length === 30) of user's repos
// only sends repos that have not already been used to create a project
router.get('/repos', (req, res, next) => {
    const gettingRepos = req.github.repos.getForUser({
        user: req.user.githubName,
        access_token: req.user.githubToken,
        type: 'owner',
        sort: 'updated',
        per_page: 100
    });

    const gettingRepos2 = req.github.repos.getForUser({
        user: req.user.githubName,
        access_token: req.user.githubToken,
        type: 'owner',
        sort: 'updated',
        page: 2,
        per_page: 100
    });

    const gettingProjects = Project.findAll({
        where: {
            ownerId: req.user.id
        }
    });

    Promise.all([gettingRepos, gettingRepos2, gettingProjects])
        .then(function(data) {
            let [repos, repos2, projects] = data;
            repos.concat(repos2);
            // exclude repos that are already associated with projects
            if (projects.length > 0) {
                repos = filterByProp(repos, projects)
            }
            res.json(repos);
        })
        .catch(next);
});
