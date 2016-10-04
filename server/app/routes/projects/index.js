const router = require('express').Router();

const path = require('path');

const Project = require(path.join(__dirname, '../../../db/models/project'));

const itemsPerPage = 30;

const GitHubApi = require("github");

const github = new GitHubApi({});

// get all projects for user
router.get('/all/user/:user/page/:page', (req, res, next) => {
    // selects range start for query
    // first page param should be zero
    const offset = req.params.page === '0' ? 1 : req.params.page * itemsPerPage;
    Project.findAll({
            where: {
                user: req.params.user
            },
            offset: offset,
            limit: itemsPerPage,
        })
        .then(projects => {
            res.json(projects);
        })
        .catch(next);
});

// get single project
router.get('/one/:projectId', (req, res, next) => {
    Project.findById(req.params.id)
        .then(project => {
            res.json(project);
        })
        .catch(next);
});

router.use('/github', require('./github'));

module.exports = router;
