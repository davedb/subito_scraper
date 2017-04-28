var assert = require('chai').assert;
var scraper = require('../scraper');
var sinon = require('sinon');
var PythonShell = require('python-shell');

describe('# Scraper -', () => {
    describe('run:', () => {
        it('when is called then it returns test message', () => {

             var fnSpy = function(){
                console.log('test');
             };
            
            var ctorStub = sinon.stub(scraper, 'ctor');
            var onStub = sinon.stub(PythonShell.prototype, 'on')
                .callsFake('msg', (fn) => {
                    var msg = 'msg';
                    fn(msg);
                });

            // act
            var scrapy = new scraper('keyword');
            scrapy.run(fnSpy);

            // assert
            assert(callback.called);
            sinon.assert.calledWith(fnSpy, 'msg');

        });
    });
});