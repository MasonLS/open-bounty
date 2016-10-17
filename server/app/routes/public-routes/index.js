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


// // get projects by search term
// router.get('/search/:searchTerm', (req, res, next) => {
//     Project.findAll({
//             where: {
//                 name: {
//                     $iLike: `%${req.params.searchTerm}%`
//                 }
//             }
//         })
//         .then(res.json.bind(res))
//         .catch(next);
// });

function findAll(model, field, search, attachment) {
    const query = {};
    query.where = {};
    query.where[field] = {
        $iLike: `%{search}%`
    };
    query.include = [attachment];
    return model.findAll(query);
}

// get projects by search term
router.get('/search/:searchTerm', (req, res, next) => {
    findAll(Project, 'name', req.params.searchTerm, Bounty)
        .then(res.json.bind(res))
        .catch(next);
});

router.get('/language/:searchTerm', (req, res, next) => {
    findAll(Project, 'language', req.params.searchTerm, Bounty)
        .then(data => {
	    console.log('data', data)
	    res.json(data);
	})
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
