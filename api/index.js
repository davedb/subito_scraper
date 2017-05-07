'use strict';
var SearchController = require('./controllers/search')
var express = require('express')
var app = express()

var searchController = new SearchController();

// routes
app.get('/', function (req, res) {
    res.send('secondhandy.com echo')
});

// search
// params:
// k => keyword
// items => max items count
app.get('/search', searchController.search);

app.listen(8080, function () {
    console.log('secondhandy.com listening on port 8080')
});

module.exports = app;