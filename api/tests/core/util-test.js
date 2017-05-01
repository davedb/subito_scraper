var assert = require('chai').assert;
const utils = require('../../core/utils');

describe('# utils - ', () => {
    describe('replaceDates - ', () => {
        it('when is called with a valid input returns the correct output', () => {
            var input = 'd": datetime.datetime(2017, 4, 14, 0, 0), "name": "203607457", "location": "SS", "year": 2016, "date_scraped": datetime.datetime(2018, 2, 1, 0, 0), "title"';
            
            // act
            var ret = utils.replaceDates(input);

            // asserts
            assert.equal(ret, 'd": "2017-4-14T0:0:0.0Z", "name": "203607457", "location": "SS", "year": 2016, "date_scraped": "2018-2-1T0:0:0.0Z", "title"');
        });
    });

    describe('formatScraperArray - ', () =>{
        it('when called with \'None\' then it is replaced with null and an array is returned', () =>{
            // setup
            var input = '{ "test" : "None"}';

            // act
            var ret = utils.formatScraperArray(input);
            
            //assert
            var exp = JSON.parse('[{ "test" : "null"}]');
            var retObj = JSON.parse(ret);
            assert.equal(exp.test, retObj.test) ;
        });

        it('when called with apex then replace them with quotes', () => {
            // setup 
            var input = "{ 'test1' : 'value1', 'test2' : 'value2'}";

            // act
            var ret = utils.formatScraperArray(input);

            // assert
            var retObj = JSON.parse(ret);
            var exp = JSON.parse("[{ \"test1\" : \"value1\", \"test2\" : \"value2\"}]");

            assert.equal(retObj.test1, exp.test1);
            assert.equal(retObj.test2, exp.test2);
        });
    });
});