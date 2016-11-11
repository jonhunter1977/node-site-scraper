'use strict';

const promise = require('bluebird');
const _webRequest = require('./webRequest');
const cheerio = require('cheerio');

let debug;
let WebRequest = _webRequest;

module.exports = class PageParser {
    constructor() {
        debug = require('debug')('node-site-scraper:pageParser');
    }

    getPage(url) {
        return new Promise((resolve, reject) => {
            const urlPageRequest = new WebRequest();
            const pageData = urlPageRequest.getBodyFromUrl(url)
                .then((pageData) => {
                    debug(new Date(), 'Data retrieved is : ' + pageData);
                    resolve(pageData);
                })
                .catch((error) => {
                    debug(new Date(), 'Error getting web page data : ' + error);
                    reject();
                });
        });
    };

    selectHtml(html, selector) {
        return new Promise((resolve, reject) => {
            let $ = cheerio.load(html);        
            resolve($(selector).html());
        });
    };
};
