var router = require('express').Router();
var Bounties = require('../../../db/models/bounty')
module.exports = router
var _ = require('lodash')

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401).end()
    }
};

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    Bounties.findById(id)
        .then(bounty => {
            res.status(201).send(bounty)
        })
        .catch(next);
});

router.post('/create', (req, res, next) => {
    Bounties.create(req.body)
        .then(bounty => {
            res.status(201).send(bounty)
        })
        .catch(next)
});

router.put('/update/:id', (req, res, next) => {
    const id = req.params.id

    Bounties.findById(id)
        .then(bounty => {
            return bounty.update(req.body)
                .then(updatedBounty => {
                    return updatedBounty
                })
        })
        .then(updatedBounty => {
            res.send(updatedBounty)
        })
        .catch(next);
});
