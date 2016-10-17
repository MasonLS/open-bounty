'use strict';

/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

const chalk = require('chalk');
const db = require('./server/db');
const User = db.model('user');
const Promise = require('sequelize').Promise;


const Faker = require('faker');
const _ = require('lodash');

const seedUsers = function () {

    const users = [
        {
            githubName: 'MasonLS',
            githubEmail: 'masonseale88@gmail.com',
            githubId: 15522249,
            githubToken: '6f4d4cfe93d46512f811154c02eaae0c12fdb52c',
            isAdmin: true
        },
        {
            githubName: 'jeff-bruemmer',
            githubEmail: 'jeff.bruemmer@gmail.com',
            githubId: 17343328,
            githubToken: '050df9305f31535f5beb798b9f30019566de457a',
            isAdmin: true
        },
        {
            githubName: 'devpatel91',
            githubEmail: 'devnitinpatel91@gmail.com',
            githubId: 18338826,
            githubToken: '21f31c04fd7bc2247049a72c611bdf39bbecfbad',
            isAdmin: true
        },
        {
            githubName: 'Aibu',
            githubEmail: 'fsaitta@aibu.it',
            githubId: 19736,
            githubToken: '21f31c04fd7bc2247049a72c611bdf39bbecfbad',
            isAdmin: true
        }
    ];

    let creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

db.sync({ force: true })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
