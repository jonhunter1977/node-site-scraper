'use strict';

let debug;

class Helpers {
    constructor() {
        debug = require('debug')('node-site-scraper:Helpers');
    }


    trimUnwantedCharactersFromString(stringToTrim) {
        return stringToTrim.replace(/\s+/g, ' ').trim();
    };
};

module.exports = new Helpers();
