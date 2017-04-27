var PythonShell = require('python-shell');
var settings = require('./config/settings');

function scraper_module(keyword) {

    var shell = new PythonShell(settings.scrapy_main, {
        args: ['-s', keyword]
    });

    this.run = function (callback) {

        var ret = shell.on('message', function (message) {
            callback(message);
        });
    };
}

module.exports = scraper_module;