'use strict';

const promise = require('bluebird');
const cheerio = require('cheerio');
const Helpers = require('./helpers');

let debug;

module.exports = class ProductListParser {
    constructor() {
        debug = require('debug')('node-site-scraper:ProductListParser');
    }

    getProductsFromHtml(productListHtml) {
        return new Promise((resolve, reject) => {
            let $ = cheerio.load(productListHtml);
            let productList = {
                products: []
            };

            $('li').each((i, element) => {
                productList.products.push({
                  title: Helpers.trimUnwantedCharactersFromString($(element).find('a').text()),
                  link: $(element).find('a').attr('href'),
                  unit_price: Helpers.trimUnwantedCharactersFromString($(element).find('div.pricing > p.pricePerUnit').text()),
                })
            });

            resolve(productList);
        });
    };
}
