const express = require('express');

const router = express.Router();

// http request library for calls to Github API 
const request = require('request');

const API = 'https://api.github.com';

router.get('/repos/:username/page/:page', (req, res, next) => {


    const query = {
        url: `${API}/users/${name}/repos`,
        headers: {
            'user-agent': 'OpenBounty',
            json: true
        }
    };

    request(query, (error, response, body) => {
        const repos = JSON.parse(body)
            .map(repo => {
                return {
                    id: repo.id,
                    name: repo.name,
                    url: repo.html_url
                }
            });
        res.json(repos);
    });

});


// search repos.
// client factory should concatenate multiple search terms with '+' as delimiter
router.get('/repos/search/:term', (req, res, next) => {

    const query = {
        url: `${API}/search/repositories?q=${term}&sort=stars&order=desc`,
        headers: {
            'user-agent': 'OpenBounty',
            json: true
        }
    };

    request(query, (error, response, body) => {
        const repos = JSON.parse(body)
            .map(repo => {
                return {
                    id: repo.id,
                    name: repo.name,
                    url: repo.html_url
                }
            });
    });

});
