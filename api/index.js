'use strict';

var settings = require('./config/settings');
var express = require('express');
var app = express();
var searchController = require('./controllers/search');

// routes
app.get('/', function (req, res) {
    res.send('secondhandy.com echo')
});

// search
app.get('/search', searchController.search);

app.listen(settings.port, function () {
    console.log('secondhandy.com listening on port ' + settings.port)
});