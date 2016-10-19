const path = require('path');
const devConfigPath = path.join(__dirname, './development.js');
const productionConfigPath = path.join(__dirname, './production.js');
const testConfigPath = path.join(__dirname, './testing.js');

if (process.env.NODE_ENV === 'production') {
    module.exports = require(productionConfigPath);
} else if (process.env.NODE_ENV === 'testing') {
    module.exports = require(testConfigPath);
} else {
    module.exports = require(devConfigPath);
}
