'use strict';

const Promise = require('bluebird');
const PageParser = require('./pageParser');

let debug;

module.exports = class ProductDataBuilder {
    constructor() {
        debug = require('debug')('node-site-scraper:productDataBuilder');
    }

    buildProductData(product) {
        return new Promise((resolve, reject) => {
            const pageParser = new PageParser();

            pageParser.getPage(product.link)
                .then((ripeFruitProductPageHtml) => {
                    debug(new Date(), Buffer.byteLength(ripeFruitProductPageHtml, 'utf8') + " bytes");
                    product.size = Buffer.byteLength(ripeFruitProductPageHtml, 'utf8') + " bytes";
                    return pageParser.selectHtml(ripeFruitProductPageHtml, '.productText > p');
                })
                .then((productDescriptionHtml) => {
                    debug(new Date(), productDescriptionHtml);
                    product.description = productDescriptionHtml;

                    return resolve(product);
                });
        });
    }
};
