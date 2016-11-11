'use strict';

const Promise = require('bluebird');
const PageParser = require('./pageParser');
const Helpers = require('./helpers');

let debug;

module.exports = class ProductDataBuilder {
    constructor() {
        debug = require('debug')('node-site-scraper:productDataBuilder');
    }

    buildProductData(product) {
        return new Promise((resolve, reject) => {
            const pageParser = new PageParser();
            let builtProduct = {};

            builtProduct.title = Helpers.trimUnwantedCharactersFromString(product.title);

            pageParser.getPage(product.link)
                .then((ripeFruitProductPageHtml) => {
                    let productPageSize = parseFloat(Buffer.byteLength(ripeFruitProductPageHtml, 'utf8') / 1000).toFixed(2);
                    builtProduct.size = productPageSize + " kb";
                    return pageParser.selectHtml(ripeFruitProductPageHtml, '.productText > p');
                })
                .then((productDescriptionHtml) => {
                    builtProduct.description = productDescriptionHtml;

                    return Promise.resolve();
                })
                .then(() => {
                  let unitPrice = Helpers.trimUnwantedCharactersFromString(product.unit_price);
                  builtProduct.unit_price = parseFloat(Helpers.trimNoneNumericCharactersFromString(unitPrice)).toFixed(2);
                  return resolve(builtProduct);
                })
        });
    }
};
