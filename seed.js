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
// const Project = db.model('project');
// const Donation = db.model('donation');
const Promise = require('sequelize').Promise;
// const GitHubApi = require('github');
// const gitHubConfig = require('./server/env').GITHUB;
// const github = new GitHubApi();

// github.authenticate({
//         type: 'oauth',
//         token: '6f4d4cfe93d46512f811154c02eaae0c12fdb52c',
//         // key: gitHubConfig.clientID,
//         // secret: gitHubConfig.clientSecret
//     });

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



// const seedProjects = function (user) {
//     let userProjects;
//     github.authenticate({
//         type: 'oauth',
//         token: user.githubToken
//     });
//     return github.repos.getForUser({
//             user: user.githubName
//         })
//         .then(repos => {
//             userProjects = repos.filter((repo, i) => i % 5 === 0);
//             return Promise.map(userProjects, userProject => {
//                 return Project.create({
//                         ownerId: user.id,
//                         repoId: userProject.id,
//                         name: userProject.name,
//                         description: Faker.lorem.sentences(),
//                         raised: _.random(0, 30000, true),
//                         paidOut: _.random(0, 60000, true)
//                     });
//             });
//         });
// }

// const seedDonations = function (project) {
//     return
// }

// const createDonation = function (project) {
//     return Donation.create({
//         ppId:,
//         intent: 'sale',
//         state:,
//         paymentMethod:,
//         amount:,
//         currency:,

//     })
// }

db.sync({ force: true })
    .then(function () {
        console.log(chalk.blue('Seeding users...'));
        return seedUsers();
    })
    // .then(function (seededUsers) {
    //     console.log(chalk.green('Seeding projects...'));
    //     return Promise.map(seededUsers, seedProjects);
    // })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
