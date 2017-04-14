var assert = require('chai').assert;
const utils = require('../lib/utils');

describe('# utils', () => {
    describe('replaceDates', () => {
        it('when is called with a valid input returns the correct output', () => {
            var input = 'd": datetime.datetime(2017, 4, 14, 0, 0), "name": "203607457", "location": "SS", "year": 2016, "date_scraped": datetime.datetime(2018, 2, 1, 0, 0), "title"';
            
            // act
            var ret = utils.replaceDates(input);

            // asserts
            assert.equal(ret, 'd": "2017-4-14T0:0:0.0Z", "name": "203607457", "location": "SS", "year": 2016, "date_scraped": "2018-2-1T0:0:0.0Z", "title"');
        });
    });
});