'use strict';

const should = require('should');
const Helpers = require('../helpers');

describe('trimUnwantedCharactersFromString', () => {

    it('should return a trimmed string', () => {

        var stringToTrim = '\n\t                                        Sainsbury\'s Apricot Ripe & Ready x5\n\t                                        \n\t';
        var trimmedString = Helpers.trimUnwantedCharactersFromString(stringToTrim);
        var expectedTrimmedString = 'Sainsbury\'s Apricot Ripe & Ready x5';
        should.equal(trimmedString, expectedTrimmedString);
    })
})
