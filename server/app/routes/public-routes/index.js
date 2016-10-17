const router = require('express').Router();
const path = require('path');
const Project = require(path.join(__dirname, '../../../db/models/project'));
const Bounty = require(path.join(__dirname, '../../../db/models/bounty'));
const GitHubApi = require('github');
const github = new GitHubApi();

// get all projects
router.get('/search/all', (req, res, next) => {
    Project.findAll({
            order: [
                ['raised', 'DESC'],
                ['updatedAt', 'DESC']
            ],
            limit: 20
        })
        .then(res.json.bind(res))
        .catch(next);
})

/**
 * Gets model rows by field
 * @param {object} model - database model.
 * @param {string} field - table column to query.
 * @param {string} search - the term to query.
 * @param {object} attachment - model for eager loading.
 */
function getByField(model, field, search, attachment) {
    const query = {};
    query.where = {};
    query.where[field] = {
        $iLike: `%${search}%`
    };
    query.include = [attachment];
    return model.findAll(query);
}

// get projects by search term
router.get('/search/:searchTerm', (req, res, next) => {
    getByField(Project, 'name', req.params.searchTerm, Bounty)
        .then(res.json.bind(res))
        .catch(next);
});

// get projects by language
router.get('/language/:searchTerm', (req, res, next) => {
    getByField(Project, 'language', req.params.searchTerm, Bounty)
        .then(res.json.bind(res))
        .catch(next);
});

// get project info by id
router.get('/repos/search/id/:repoId', (req, res, next) => {
    github.repos.getById({
            id: req.params.repoId
        })
        .then(res.json.bind(res))
        .catch(next);
});

module.exports = router;
