'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const GitHubApi = require('github');
const github = new GitHubApi();
module.exports = router;

// Public routes
router.use('/public', require('./public-routes'));
router.use('/donations', require('./donations'));

router.use('/', (req, res, next) => {
    github.authenticate({
        type: 'oauth',
        token: req.user.githubToken
    })
    req.github = github;
    next();
});

router.use('/users', require('./users'));

router.use('/bounties', require('./bounties'));
router.use('/projects', require('./projects'));

// Make sure this is after all of
// the registered routes!
router.use((req, res) => {
    res.status(404).end();
});
