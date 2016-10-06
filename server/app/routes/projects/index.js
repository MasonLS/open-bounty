const router = require('express').Router();

const path = require('path');

const Project = require(path.join(__dirname, '../../../db/models/project'));

// get all projects for user
router.get('/all/owner/:ownerId', (req, res, next) => {
    Project.findAll({
            where: {
                ownerId: req.params.ownerId
            }
        })
        .then(projects => res.json(projects))
        .catch(next);
});

// get single project
router.get('/one/:projectId', (req, res, next) => {
    const response = {}
    Project.findById(req.params.projectId)
        .then(project => {
            response.project = project;
            req.github.repos.getById({
                    id: project.repoId
                })
                .then(repo => {
                    response.repo = repo
                    res.json(response);
                });
        })
        .catch(next);
});

// create project
router.post('/new', (req, res, next) => {
    console.log('req.body:', req.body)
    Project.create(req.body)
        .then(project => res.send(project))
        .catch(next);
});

router.use('/github', require('./github'));

module.exports = router;
