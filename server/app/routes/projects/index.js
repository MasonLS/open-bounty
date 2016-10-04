const router = require('express').Router();

const path = require('path');

const Project = require(path.join(__dirname, '../../../db/models/project'));

const itemsPerPage = 30;

// get all projects for user
router.get('/all/:page', (req, res, next) => {

    // selects range start for query
    // first page param should be zero
    const offset = req.params.page === 0 ? 1 : req.params.page * itemsPerPage;

    Project.findAll({
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

// get all projects by user
router.get('/user/:userId/page/:page', (req, res, next) => {

    // selects range start for query
    // first page param should be 0
    const offset = req.params.page === 0 ? 1 : req.params.page * itemsPerPage;
    
    Project.findAll({
	where: {
	    userId: req.params.userId
	},
	offset: offset,
	limit: itemsPerPage
    })
	.then(projects => {
	    res.json(projects);
	})
	.catch(next);

});

module.exports = router;

