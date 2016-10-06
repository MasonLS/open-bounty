'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db');
const User = db.model('user');
const Project = db.model('project');
const Bounty = db.model('bounty');
const Promise = require('bluebird');
module.exports = router;

// for filtering out user repos already created as projects
const filterByProp = (objectA, objectB) => {
    return objectA.filter(element => {
        if (Object.keys(objectB).length > 0) {
            for (let key in objectB) {
                return element.name != objectB[key].name
            }
        }
    })
};

// sends back an array(.length === 30) of user's repos
// only sends repos that have not already been used to create a project
router.get('/repos', (req, res, next) => {
    const gettingRepos = req.github.repos.getForUser({
        user: req.user.githubName,
        access_token: req.user.githubToken
    });

    const gettingProjects = Project.findAll({
        where: {
            ownerId: req.user.id
        }
    });

    Promise.all([gettingRepos, gettingProjects])
        .then(function(data) {
            let [repos, projects] = data;
	    // exclude repos that are already associated with projects
            if (projects.length > 0) {
                repos = filterByProp(repos, projects)
            }
	    res.json(repos);
        })
        .catch(next);
});

//get starred projects with bounties attached

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
            console.log('STARRED PROJECTS !!!!', starredProjects);
            // return starredProjects[0].addBounties(req.github, req.user.githubName)
            //     .then(data => {
            //         console.log(data)
            //     })
            return Promise.map(starredProjects, project => {
                return project.addBounties(req.github, req.user.githubName);
            })
        })
        .then(starredProjectsWithBounties => {
            res.json(starredProjectsWithBounties);
        })
        .catch(next);
});
