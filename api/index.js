'use strict';

const Hapi = require('hapi');
const scraper = require('./scraper');
const server = new Hapi.Server();
const PythonShell = require('python-shell');
const pytalk = require('pytalk');
const utils = require('./lib/utils');

server.connection({ port: 8080, host: 'localhost' });

// routes
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('The api is working properly!');
    }
});

server.route({
    method: 'GET',
    path: '/search',
    handler: function (request, reply) {

        var response = '';

        var scrappy = new scraper();
        var ret = scrappy.run(new PythonShell('../progetto_90_scrapy/main.py'), (message) => {
            if (message == '###END###') {
                response = utils.formatScraperArray(response);

                var objJson = JSON.parse(response);
                reply(objJson);
            }

            response = response + message + ',';
        });
    }
});

// Start server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
