'use strict';
var scraper = require('../scraper');
var PythonShell = require('python-shell');
var settings = require('../config/settings');
var utils = require('../core/utils');
var ValidationException = require('../core/exceptions/ValidationException');

// # Search
// params:
// k => keyword
// items => max items count
function search(req, res) {
        var response = '';
        var keyword = req.query.k;
        var items = req.query.items;

        // validation
        if (keyword.trim() === '') {
            throw new ValidationException('keyword is mandatory');
        }

        if(items !== undefined && 
            (items !== parseInt(items) || items < 1 || items > 100)){
            throw new ValidationException('items parameter is not valid');
        }

        var scrapy = new scraper();
        var shell = new PythonShell(settings.scrapy_main, {
            args: ['-s', keyword]
        });

        var limit = 0;
        var ret = scrapy.run(shell, (message) => {
            if (message == '###END###' || limit == items) {
                response = utils.formatScraperArray(response);

                var objJson = JSON.parse(response);
                res.send(objJson);
            }

            response = response + message + ',';
            limit++;
        });
}

module.exports = {
    search: search
};