'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db');
const User = db.model('user');
const GitHubApi = require('github');
var github = new GitHubApi();
module.exports = router;

//only need this if requests to github need to be authenticated (token)
router.use('/', (req, res, next) => {
	github.authenticate({
		type: 'oauth',
		token: req.user.githubToken
	})
	
	next();
});

//sends back an array(.length === 30) of user's repos
router.get('/repos', (req, res, next) => {
	github.repos.getForUser({
		user: req.user.githubName,
		access_token: req.user.githubToken
	})
	.then(response => {
		res.json(response);
	})
	.catch(next);
});

//get user's starred repos as an array
router.get('/starred', (req, res, next) => {
	github.activity.getStarredReposForUser({
		user: req.user.githubName
	})
	.then(response => {
		res.json(response);
	})
	.catch(next);
});






