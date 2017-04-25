function scraper_module() {

    this.run = function (scraper, callback) {

        var ret = scraper.on('message', function (message) {
                callback(message);
        });
    };
}

module.exports = scraper_module;