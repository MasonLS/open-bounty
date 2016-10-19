'use strict';

const chalk = require('chalk');
const db = require('./db');

// Create a node server instance! cOoL!
const server = require('http').createServer();

const createApplication = () => {
    let app = require('./app')(db);
    server.on('request', app); // Attach the Express application.
    require('./io')(server); // Attach socket.io.
};

const startServer = () => {

    let PORT = process.env.PORT || 1337;

    server.listen(PORT, () => {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

};

db.sync()
    .then(createApplication)
    .then(startServer)
    .catch(err => {
        console.error(chalk.red(err.stack));
    });
