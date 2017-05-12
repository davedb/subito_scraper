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
app.get('/search', function (req, res) {
    try {
        searchController.search(req, res);
    }
    catch (err) {
        if (err.name === 'ValidationException') {
            res.statusCode = 400;
            res.send(err.message);
        }
    }
});

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.listen(8080, function () {
    console.log('secondhandy.com listening on port 8080')
});

module.exports = app;