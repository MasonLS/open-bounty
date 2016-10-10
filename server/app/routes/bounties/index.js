'use strict';

const router = require('express').Router();
const Bounty = require('../../../db/models/bounty');
const Project = require('../../../db/models/project');
module.exports = router;

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401).end()
    }
}

router.post('/', (req, res, next) => {
    console.log(req.body);
    Project.findById(req.body.projectId)
        .then(project => {
            const newRaised = project.raised - req.body.amount;
            const newPaidOut = project.paidOut + req.body.amount;
	    project.update({
                    raised: newRaised,
                    paidOut: newPaidOut
                })
                .then(() => {
                    Bounty.create(req.body)
                        .then(bounty => {
                            res.status(201).send(bounty)
                        })
                })
        });
});

router.param('bountyId', (req, res, next, bountyId) => {
    Bounty.findById(bountyId)
        .then(bounty => {
            req.bounty = bounty;
            next();
        })
        .catch(next);
});

router.get('/:bountyId', (req, res, next) => {
    const bounty = req.bounty;

    bounty.getProject()
        .then(project => {
            return bounty.attachIssue(req.github, req.user.githubName, project.name);
        })
        .then(bountyWithIssue => {
            res.send(bountyWithIssue);
        })
        .catch(next);
});

router.put('/:bountyId', (req, res, next) => {
    req.bounty.update(req.body)
        .then(updatedBounty => {
            res.send(updatedBounty);
        })
        .catch(next);
});

router.delete('/:bountyId', (req, res, next) => {
    req.bounty.destroy()
        .then(_ => {
            res.sendStatus(204);
        })
        .catch(next);
});
