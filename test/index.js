const path = require('path');
const chai = require('chai');
const testUtils = require('./utils');

global.expect = chai.expect;
global.testUtils = testUtils;
global.ROOT_PATH = path.join(__dirname, './../');

process.on('unhandledRejection', trace => console.log(trace));
