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
        reply('The api is working properly!');
    }
});

server.route({
    method: 'GET',
    path: '/search',
    handler: function(request, reply) {
        var scrappy = new scraper();
        scrappy.run(function(message){
            reply(message);
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
