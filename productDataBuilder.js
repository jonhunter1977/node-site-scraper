'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const PageParser = require('./pageParser');
const Helpers = require('./helpers');

let debug;

module.exports = class ProductDataBuilder {
    constructor() {
        debug = require('debug')('node-site-scraper:productDataBuilder');
    }

    buildProductData(product) {
        const pageParser = new PageParser();
        let builtProduct = {};

        builtProduct.title = Helpers.trimUnwantedCharactersFromString(product.title);

        return pageParser.getPage(product.link)
            .then((ripeFruitProductPageHtml) => {
                const productPageSize = parseFloat(Buffer.byteLength(ripeFruitProductPageHtml, 'utf8') / 1000).toFixed(2);
                builtProduct.size = productPageSize + " kb";
                return pageParser.selectHtml(ripeFruitProductPageHtml, '.productText > p');
            })
            .then((productDescriptionHtml) => {
                builtProduct.description = productDescriptionHtml;
            })
            .then(() => {
                const unitPrice = Helpers.trimUnwantedCharactersFromString(product.unit_price);
                builtProduct.unit_price = parseFloat(Helpers.trimNoneNumericCharactersFromString(unitPrice)).toFixed(2);
            })
            .then(() => {
                return builtProduct;
            });
    }

    getTotalCostOfProducts(products) {
        let unitPriceTotal = 0;
        unitPriceTotal = _.sumBy(products, (product) => {
            return parseFloat(product.unit_price);
        });

        return unitPriceTotal.toFixed(2);
    }
};
