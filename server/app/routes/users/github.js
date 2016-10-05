'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db');
const User = db.model('user');
module.exports = router;

//sends back an array(.length === 30) of user's repos
router.get('/repos', (req, res, next) => {
    const response = {}
	req.github.repos.getForUser({
		user: req.user.githubName,
		access_token: req.user.githubToken
	})
	.then(repos => {
	    response.repos = repos;
	    Project.findAll({
		where: {
		    ownerId: req.user.id
		}
	    })
		res.json(repos);
	})
	.catch(next);
});

//get user's starred repos as an array
router.get('/starred', (req, res, next) => {
	req.github.activity.getStarredReposForUser({
		user: req.user.githubName
	})
	.then(response => {
		res.json(response);
	})
	.catch(next);
});






