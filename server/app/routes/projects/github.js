'use strict';
const router = require('express').Router();

const GitHubApi = require("github");

const github = new GitHubApi({});

// get repos by user
router.get('/repos/user/:user', (req, res, next) => {
    github.repos.getForUser({
            user: req.params.user
        })
        .then(repos => {
            res.json(repos);
        })
        .catch(next);
});

// search all github repos
router.get('/repos/search/:query', (req, res, next) => {
    github.search.repos({
            q: req.params.query,
            sort: 'stars'
        })
        .then(repos => {
            repos = repos.items
                .map(repo => {
                    return {
                        id: repo.id,
                        name: repo.name,
                        url: repo.html_url
                    };
                });
            res.json(repos)
        })
        .catch(next);
});

// get all issues for repo
router.get('/issues/user/:user/repo/:repo', (req, res, next) => {

    github.issues.getForRepo({
            user: req.params.user,
            repo: req.params.repo
        })
        .then(issues => {
            res.json(issues)
        })
        .catch(next);

});

module.exports = router;
