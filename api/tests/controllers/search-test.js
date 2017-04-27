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
                search.search(req, res);
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
                search.search(req, res);
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
                search.search(req, res);
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
                search.search(req, res);
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
                search.search(req, res);
            } catch (err) {
                assert.equal(err.name, 'ValidationException');
                assert.equal(err.message, 'items parameter is not valid');
                return;
            }

            assert.fail();
        });

        it('when is called with valid parameters then the response is properly populated', () => {
            assert.fail();
        });
    });
});