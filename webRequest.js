'use strict';

const promise = require('bluebird');
const request = require('request');

let debug;
module.exports = class WebRequest {
    constructor() {
        debug = require('debug')('node-site-scraper:webRequest');
    }

    getBodyFromUrl(url) {
        debug(new Date(), url);

        return new Promise((resolve, reject) => {

            debug(new Date(), 'Retrieving page from : ' + url);

            request(url, function(error, response, body) {

                if (error) {
                    debug(new Date(), 'Problem with webrequest : ' + error);
                    return reject(error);
                }

                resolve(body);
            });
        });
    }
};
