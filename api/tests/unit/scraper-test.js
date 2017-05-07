var assert = require('chai').assert;
var proxyquire = require('proxyquire');
var sinon = require('sinon');
var scraper = {};
var on = {}
describe('# Scraper -', () => {
    describe('run:', () => {
        beforeEach(() => {
            scraper = proxyquire('../../scraper', {
                'python-shell': function () {
                    this.on = on
                }
            });
        });

        it('when is called then it returns test message', () => {
            // setup
            var spy = sinon.spy();
            on = function (msg, callback) {
                msg = 'test msg';
                callback(msg);
            };

            var scrapy = new scraper('keyword');
            
            // act
            scrapy.run(spy);

            // assert
            sinon.assert.calledWith(spy, 'test msg');

        });
    });
});