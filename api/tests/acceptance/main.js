'use strict'

var chai = require('chai');
var assert = chai.assert;
var request = require('request'); 
var instance;

describe("Web API", () => {
    describe("GET /", () => {
        it("when called it returns echo string", (done) => {
            request.get("http://localhost:8080/", (err, res, body) => {
                assert.equal(res.statusCode, 200);
                assert.equal(res.body, "secondhandy.com echo");
                done();
            });
        });
    });

    describe("GET /search", () => {
        it("when called without key", (done) => { 

            request.get("http://localhost:8080/search?k=", (err, res, body) => {
                assert.equal(res.statusCode, 400);
                assert.equal(res.body, "keyword is mandatory");
                done();  
            });     
        });

        it("when called with an invalid items value", (done) => { 

            request.get("http://localhost:8080/search?k=piaggio&items=invalid", (err, res, body) => {
                assert.equal(res.statusCode, 400);
                assert.equal(res.body, "items parameter is not valid");
                done();  
            });     
        });

        it("when called with valid parameters returns", (done) => { 
            request.get("http://localhost:8080/search?k=piaggio&items=3", (err, res, body) => {
                assert.equal(res.statusCode, 200);

                var obj = JSON.parse(res.body);

                assert.equal(obj.length, 3);

                obj.forEach(function(element) {
                    assert.isDefined(element.query);
                    assert.isDefined(element.mileage);
                    assert.isDefined(element.category);
                    assert.isDefined(element.location);
                    assert.isDefined(element.year);
                    assert.isDefined(element.date_published);
                    assert.isDefined(element.title);
                    assert.isDefined(element.date_scraped);
                    assert.isDefined(element.name);
                    assert.isDefined(element.link);
                    assert.isDefined(element.price);

                     assert.equal(Object.keys(element).length, 11);
                }, this);

               
                done();  
            });     
        });
    });
});