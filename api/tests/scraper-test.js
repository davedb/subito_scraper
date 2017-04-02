var assert = require('chai').assert;
var scraper = require('../scraper');
var sinon = require('sinon');
var baseUrl = 'http://localhost:8080/';

const retStr = 'JSON ret error message';

describe('# Scraper', () => {
    describe('run', () => {
        it('when is called then it returns test message', () => {
            var scrappy = new scraper();
            var callback = sinon.spy();
            
            var pythonScraper = {
                on: function () { }
            };

            var testRet = '';
            var on = sinon.stub(pythonScraper, 'on', (message, c1) => {
                testRet = retStr;
                c1();
            });

            // act
            scrappy.run(pythonScraper, callback);

            // assert
            assert(callback.called);
            assert.equal(testRet, retStr);
        });
    });
});