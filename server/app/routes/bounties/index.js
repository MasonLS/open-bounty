const router = require('express').Router();
const Bounty = require('../../../db/models/bounty')
module.exports = router
const _ = require('lodash')

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401).end()
    }
};

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    Bounty.findAll({
            where: {
                projectId: id
            }//,
            // include: [Project]
        })
        .then(bounty => {
            res.status(201).send(bounty)
        })
        .catch(next);
});

router.post('/create', (req, res, next) => {
    const body = req.body
    Bounty.create(body)
        .then(bounty => {
            res.status(201).send(bounty)
        })
        .catch(next)
});

router.put('/update/:id', (req, res, next) => {
    const id = req.params.id

    Bounty.findById(id)
        .then(bounty => {
            return bounty.update(req.body)
        })
        .then(updatedBounty => {
            res.send(updatedBounty)
        })
        .catch(next);
});
