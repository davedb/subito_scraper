'use strict';
const scraper = require('./scraper');
const PythonShell = require('python-shell');
const utils = require('./core/utils');

var express = require('express')
var app = express()



// routes
app.get('/', function (req, res) {
    res.send('The Api is working properly!')
});

app.get('/search', function (req, res) {
    var response = '';

    var scrappy = new scraper();
    var ret = scrappy.run(new PythonShell('../progetto_90_scrapy/main.py'), (message) => {
        if (message == '###END###') {
            response = utils.formatScraperArray(response);

            var objJson = JSON.parse(response);
            res.send(objJson);
        }

        response = response + message + ',';
    })
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
});