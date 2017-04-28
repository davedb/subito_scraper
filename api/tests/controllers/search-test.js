var assert = require('chai').assert;
var scraper = require('../../scraper');
var sinon = require('sinon');
var search = require('../../controllers/search');

describe('# search controller -', () => {
    describe('search -', () => {
        it('when the keyword parameter is empty then it raises an exception', () => {
            try {
                var req = {
                    query: {
                        k: ''
                    }
                };
                var res = {};
                 var controller = new search();
                controller.search(req, res);

            } catch (err) {
                assert.equal(err.name, 'ValidationException');
                assert.equal(err.message, 'keyword is mandatory');
                return;
            }

            assert.fail();
        });

        it('when the keyword parameter is undefined then it raises an exception', () => {
             try {
                var req = {
                    query: {
                        k: ''
                    }
                };
                var res = {};
                var controller = new search();
                controller.search(req, res);
            } catch (err) {
                assert.equal(err.name, 'ValidationException');
                assert.equal(err.message, 'keyword is mandatory');
                return;
            }

            assert.fail();
        });

        it('when the items parameter is not an integer then it raises an exception', () => {
             try {
                var req = {
                    query: {
                        k: 'test',
                        items : 'string'
                    }
                };
                var res = {};
                var controller = new search();
                controller.search(req, res);
            } catch (err) {
                assert.equal(err.name, 'ValidationException');
                assert.equal(err.message, 'items parameter is not valid');
                return;
            }

            assert.fail();
        });

        it('when the items parameter is lower than 1 then it raises an exception', () => {
             try {
                var req = {
                    query: {
                        k: 'test',
                        items : 0
                    }
                };
                var res = {};
                var controller = new search();
                controller.search(req, res);
            } catch (err) {
                assert.equal(err.name, 'ValidationException');
                assert.equal(err.message, 'items parameter is not valid');
                return;
            }

            assert.fail();
        });

        it('when the items parameter is greater than 100 then it raises an exception', () => {
            try {
                var req = {
                    query: {
                        k: 'test',
                        items : 101
                    }
                };
                var res = {};
                var controller = new search();
                controller.search(req, res);
            } catch (err) {
                assert.equal(err.name, 'ValidationException');
                assert.equal(err.message, 'items parameter is not valid');
                return;
            }

            assert.fail();
        });

        it('when is called with valid parameters then the response is properly populated', () => {
            var req = {
                query: {
                    k: 'test',
                    items: 1
                }
            };
            var res = {
                send: sinon.spy()
            };
            var controller = new search();

            var runStub = sinon.stub(scraper.prototype, 'run');
            var ctorStub = sinon.stub(scraper.prototype, 'ctor');
            var message = '{"query":"bmw","price":"4400","category":null,"name":"205201370","location":"PA","link":"http://www.subito.it/","date_scraped":"2017-4-28T0:0:0.0Z","title":"Bmw","mileage":[40000,44999],"year":2000,"date_published":"2017-4-28T0:0:0.0Z"}';
            
            runStub.callsFake((callback) => {

                callback(message);
                callback("###END###");
            });

            controller.search(req, res);
            sinon.assert.calledWith(res.send, JSON.parse('[' + message + ']'));

            runStub.restore();
            ctorStub.restore();
        });
    });
});