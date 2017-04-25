'use strict';
const scraper = require('./scraper');
const PythonShell = require('python-shell');
const utils = require('./core/utils');
const settings = require('./config/settings');
var express = require('express')
var app = express()



// routes
app.get('/', function (req, res) {
    res.send('secondhandy.com echo')
});

// search
// params:
// k => keyword
// items => max items count
app.get('/search', function (req, res) {
    var response = '';
    var keyword = req.query.k;
    var items = req.query.items;

    var scrapy = new scraper();    
    var shell = new PythonShell(settings.scrapy_main, {
        args : ['-s', keyword]
    });
   
   var limit = 0;
    var ret = scrapy.run(shell, (message) => {
        if (message == '###END###' || limit == items) {
            response = utils.formatScraperArray(response);

            var objJson = JSON.parse(response);
            res.send(objJson);
        }

        response = response + message + ',';
        limit ++;
    });
});

app.listen(8080, function () {
    console.log('secondhandy.com listening on port 8080')
});