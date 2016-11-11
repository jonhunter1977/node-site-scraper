'use strict';

const should = require('should');
const Helpers = require('../helpers');

describe('trimUnwantedCharactersFromString', () => {

    it('should return a trimmed string', () => {

        const stringToTrim = '\n\t                                        Sainsbury\'s Apricot Ripe & Ready x5\n\t                                        \n\t';
        const trimmedString = Helpers.trimUnwantedCharactersFromString(stringToTrim);
        const expectedTrimmedString = 'Sainsbury\'s Apricot Ripe & Ready x5';
        should.equal(trimmedString, expectedTrimmedString);
    })
});

describe('trimNoneNumericCharactersFromString', () => {

    it('should remove any characters that stop the string being parsed to a number', () => {
        const stringToTrim = '£3.20/unit';
        const trimmedString = Helpers.trimNoneNumericCharactersFromString(stringToTrim);
        const expectedTrimmedString = '3.20';
        should.equal(trimmedString, expectedTrimmedString);
    });

})
