'use strict';
const router = require('express').Router();

// search all github repos
router.get('/repos/search/:query', (req, res, next) => {
    req.github.search.repos({
            q: req.params.query,
            sort: 'stars'
        })
        .then(repos => res.json(repos))
        .catch(next);
});

// get all issues for repo
router.get('/repos/issues/:repo', (req, res, next) => {
    req.github.issues.getForRepo({
            user: req.user,
            repo: req.params.repo
        })
        .then(issues => res.json(issues))
        .catch(next);
});

module.exports = router;
