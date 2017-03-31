'use strict';

const Hapi = require('hapi');
const scraper = require('./scraper');
const server = new Hapi.Server();

server.connection({ port: 8080 , host: 'localhost' });

// routes
server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
        reply('Api is working!');
    }
});

server.route({
    method: 'GET',
    path: '/search',
    handler: function(request, reply) {
        var scrappy = new scraper();
        scrappy.run(function(message){
            var objJson = JSON.parse(message);
            reply(objJson);
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
