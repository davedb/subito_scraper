var PythonShell = require('python-shell');

function scraper_module() {
    var done = false;

    this.run = function (callback) {
        
        var subitoScraper = new PythonShell('test-scraper.py');

        var response = "test response";
        subitoScraper.on('message', function (message) {
            callback(message);
        });
    };
}

module.exports = scraper_module;