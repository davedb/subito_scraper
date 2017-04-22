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

app.get('/search', function (req, res) {
    var response = '';

    var scrapy = new scraper();
    var ret = scrapy.run(new PythonShell(settings.scrapy_main), (message) => {
        if (message == '###END###') {
            response = utils.formatScraperArray(response);

            var objJson = JSON.parse(response);
            res.send(objJson);
        }

        response = response + message + ',';
    })
});

app.listen(8080, function () {
    console.log('secondhandy.com listening on port 8080')
});