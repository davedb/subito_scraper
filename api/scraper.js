var PythonShell = require('python-shell');
var settings = require('./config/settings');

function scraper_module(args) {

    var shell = new PythonShell(settings.scrapy_main, {
        args: args
    });

    this.run = function (callback) {

        var ret = scraper.on('message', function (message) {
            callback(message);
        });
    };
}

module.exports = scraper_module;