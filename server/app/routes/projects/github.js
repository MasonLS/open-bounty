'use strict';

const router = require('express').Router();
module.exports = router;

// search un-bounty-ified issues for project repo
router.get('/issues/:searchTerm', (req, res, next) => {
    let searchTerm = req.params.searchTerm;
    let queryString = `${searchTerm}+type:issue+repo:${req.user.githubName}/${req.project.name}+is:open`;

    req.github.search.issues({
        q: queryString
    })
    .then(searchResultsObj => res.send(searchResultsObj.items))
    .catch(next);
});

// search all github repos
router.get('/repos/search/:query', (req, res, next) => {
    req.github.search.repos({
            q: req.params.query,
            sort: 'stars'
        })
        .then(repos => res.json(repos))
        .catch(next);
});