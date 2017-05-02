'use strict';

var scraper = require('../scraper');
var settings = require('../config/settings');
var utils = require('../core/utils');
var ValidationException = require('../core/exceptions/ValidationException');

class searchController {

    // # Search
    // params:
    // k => keyword
    // items => max items count
    search(req, res) {
        var response = '';
        var keyword = req.query.k;
        var items = req.query.items;

        // validation
        if ("undefined" === typeof keyword || keyword.trim() === '') {
            throw new ValidationException('keyword is mandatory');
        }
        if ("undefined" !== typeof items &&

            (isNaN(parseInt(items)) || parseInt(items) < 1 || parseInt(items) > 100)) {
            throw new ValidationException('items parameter is not valid');
        }

        var scrapy = new scraper(keyword);

        var limit = 0;
        var ret = scrapy.run((message) => {
            if (message == '###END###' || limit == items) {
                response = utils.formatScraperArray(response);

                var objJson = JSON.parse(response);
                res.send(objJson);
                return;
            }

            response = response + message + ',';
            limit++;
        });
    }
}

module.exports = searchController;