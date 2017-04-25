var assert = require('chai').assert;
var scraper = require('../../scraper');
var sinon = require('sinon');

describe('# search controller -', () => {
    describe('search -', () => {
        it('when the keyword parameter is null or empty then it raises an exception', () => {
            assert.fail();
        });

        it('when the items parameter is not an integer then it raises an exception', () => {
            assert.fail();
        });

        it('when the items parameter is lower than 1 then it raises an exception', () => {
            assert.fail();
        });

        it('when the items parameter is greater than 100 then it raises an exception', () => {
            assert.fail();
        });

        it('when is called with valid parameters then the response is properly populated', () => {
            assert.fail();
        });
    });
});