'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

router.use('/users', require('./users'));
// router.use('/donations', require('./donations'));
// router.use('/bounties', require('./bounties'));
router.use('/projects', require('./projects'));

// Make sure this is after all of
// the registered routes!
router.use((req, res) => {
    res.status(404).end();
});
