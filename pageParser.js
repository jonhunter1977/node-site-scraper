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
        const urlPageRequest = new WebRequest();
        return urlPageRequest.getBodyFromUrl(url)
            .then((pageData) => {
                return pageData;
            })
            .catch((error) => {
                debug(new Date(), 'Error getting web page data : ' + error);
            });
    }

    selectHtml(html, selector) {
        const $ = cheerio.load(html);
        return $(selector).html();
    }
};
