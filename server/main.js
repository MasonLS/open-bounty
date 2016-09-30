'use strict';
var chalk = require('chalk');
var db = require('./db');

// Create a node server instance! cOoL!
var server = require('http').createServer();

var createApplication = () => {
    var app = require('./app')(db);
    server.on('request', app); // Attach the Express application.
    require('./io')(server);   // Attach socket.io.
};

var startServer = () => {

    var PORT = process.env.PORT || 1337;

    server.listen(PORT, () => {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

};

db.sync()
.then(createApplication)
.then(startServer)
.catch( err => {
    console.error(chalk.red(err.stack));
});
