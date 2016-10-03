'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db');
const User = db.model('user');
const request = require('request');
module.exports = router;

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};
//get all users
router.get('/', (req, res, next) => {
    console.log('REQ.USER', req.user)
    console.log('SESSION', req.session)
    User.findAll()
        .then(users => {
            res.send(users);
        })
        .catch(next);
});

//create and return newly created user row
router.post('/', (req, res, next) => {
    User.create(req.body)
        .then(user => {
            res.status(201).send(user);
        })
        .catch(next);
});

router.param('userId', (req, res, next, userId) => {
    User.findById(req.params.userId)
        .then(user => {
            req.userSought = user;
            next();
        })
        .catch(next);
});

//get one, put one, delete one routes

router.get('/:userId', (req, res, next) => {
    res.send(req.userSought);
});

router.put('/:userId', (req, res, next) => {
    req.userSought.update(req.body)
        .then(_ => {
            res.sendStatus(204);
        })
        .catch(next);
});

router.delete('/:userId', (req, res, next) => {
    req.userSought.destroy()
        .then(_ => {
            res.sendStatus(204);
        })
        .catch(next);
});

router.use('/:userId/github', require('./github'));



