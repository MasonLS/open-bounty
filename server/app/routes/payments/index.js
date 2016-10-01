'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
var path = require('path');
var env = require(path.join(__dirname, '../../../env'));
module.exports = router;
// paypal.configure(second_config);

var ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.get('/receive-payment', ensureAuthenticated, (req, res) => {
    res.json(env);

});
