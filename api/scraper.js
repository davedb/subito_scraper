'use strict';

var PythonShell = require('python-shell');
var settings = require('./config/settings');
var shell = {};

class scraper {
    constructor(keyword) {
        shell = new PythonShell(settings.scrapy_main, {
            args: ['-s', keyword]
        });
    }

    run(callback) {
        shell.on('message', function (message) {
            callback(message);
        });
    };
}

module.exports = scraper;