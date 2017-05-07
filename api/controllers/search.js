'use strict';

var scraper = require('../scraper');
var settings = require('../config/settings');
var utils = require('../core/utils');
var ValidationException = require('../core/exceptions/ValidationException');
const PythonShell = require('python-shell');

class searchController {

    // # Search
    // params:
    // k => keyword
    // items => max items count
    search(req, res) {
        var response = '';
        var keyword = req.query.k;
        var items = req.query.items;

        var scrapy = new scraper(keyword);

        var limit = 0;
        var ret = scrapy.run((message) => {
            if (message == '###END###' || limit == items) {
                response = utils.formatScraperArray(response);

                var objJson = JSON.parse(response);
                res.send(objJson);
            }

            response = response + message + ',';
            limit++;
        });
    }
}

module.exports = searchController;