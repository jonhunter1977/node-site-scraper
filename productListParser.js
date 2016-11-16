'use strict';

const promise = require('bluebird');
const cheerio = require('cheerio');

let debug;

module.exports = class ProductListParser {
    constructor() {
        debug = require('debug')('node-site-scraper:ProductListParser');
    }

    getProductsFromHtml(productListHtml) {
        return new Promise((resolve, reject) => {
            const $ = cheerio.load(productListHtml);
            const productList = {
                products: []
            };

            $('li').each((i, element) => {
                productList.products.push({
                    title: $(element).find('a').text(),
                    link: $(element).find('a').attr('href'),
                    unit_price: $(element).find('div.pricing > p.pricePerUnit').text()
                })
            });

            resolve(productList);
        });
    };
}
