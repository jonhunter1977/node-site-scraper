'use strict';

module.exports = function() {

    const trimUnwantedCharactersFromString = function(stringToTrim) {
        return stringToTrim.replace(/\s+/g, ' ').trim();
    };

    const trimNoneNumericCharactersFromString = function(stringToTrim) {
        return stringToTrim.replace(/[^\d.-]/g, '').trim();
    };

    return {
        trimUnwantedCharactersFromString: trimUnwantedCharactersFromString,
        trimNoneNumericCharactersFromString: trimNoneNumericCharactersFromString
    }
}();
