const PythonShell = require('python-shell');


function scraper_module() {
    var done = false;

    this.run = function (scraper, callback) {

        var ret = scraper.on('message', function (message) {
            if (!done) {
                callback(message);
            }
        });
    };
}

module.exports = scraper_module;