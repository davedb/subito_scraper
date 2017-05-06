'use strict';

var settings = require('./config/settings');
var express = require('express');
var app = express();
var searchModule = require('./controllers/search');

var searchController = new searchModule();

// routes
app.get('/', function (req, res) {
    res.send('secondhandy.com echo');
});

// search
app.get('/search', function(req, res){
    try{
         searchController.search(req, res);
    }catch(err){
        if(err.name === 'ValidationException'){
            res.status = 400;
            res.send(err.message);
        }
    }
});

app.listen(settings.port, function () {
    console.log('secondhandy.com listening on port ' + settings.port)
});

module.exports = app;