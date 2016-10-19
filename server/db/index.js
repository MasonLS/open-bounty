'use strict';

const db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-vars
const User = require('./models/user');
const Project = require('./models/project');
const Bounty = require('./models/bounty');
const Donation = require('./models/donation');
// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)
User.hasMany(Donation, { as: 'donor' });
Donation.belongsTo(User, { as: 'donor' });

Project.hasMany(Donation);
Donation.belongsTo(Project);

Project.hasMany(Bounty);
Bounty.belongsTo(Project);

Project.belongsTo(User, { as: 'owner' });
// User.hasMany(Project);
Bounty.belongsToMany(User, { through: 'bounty_hunters', as: 'hunters' });
User.belongsToMany(Bounty, { through: 'bounty_hunters', foreignKey: 'hunterId' });
