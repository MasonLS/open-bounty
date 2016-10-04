'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db');
const User = db.model('user');
const request = require('request');
module.exports = router;

const apiUrl = 'https://api.github.com/user/emails';

//get user's public repos
router.get('/repos', (req, res, next) => {
	let options = {
		url: apiUrl,
		headers: {
			'User-Agent': 'OpenBounty'
		}
	}
	request.get(options, (err, response, body) => {
		if (err) next(err);
		else res.json(body);
	});
});

//get user's starred repos