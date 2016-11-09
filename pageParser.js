'use strict';

const promise = require('bluebird');
const webRequest = require('./webRequest');

let debug;
module.exports = class pageParser {
    constructor() {
        debug = require('debug')('node-site-scraper:pageParser');
    }

    getProductsFromPage(url) {
        return new Promise((resolve, reject) => {
            const urlPageRequest = new webRequest();
            const pageData = urlPageRequest.getBodyFromUrl(url)
                .then((pageData) => {
                    debug(debug(new Date(), 'Data retrieved is : ' + pageData));
                    resolve();
                })
                .catch((error) => {
                    debug(debug(new Date(), 'Error getting web page data : ' + error));
                    reject();
                });
        });

    }
};
