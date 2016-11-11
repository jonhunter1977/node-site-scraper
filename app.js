'use strict';

const debug = require('debug')('node-site-scraper:app');
const Promise = require('bluebird');
const _ = require('lodash');
const PageParser = require('./pageParser');
const ProductListParser = require('./ProductListParser');

debug(new Date(), 'Start scrape');

const ripeFruitsPageUrl = 'http://hiring-tests.s3-website-eu-west-1.amazonaws.com/2015_Developer_Scrape/5_products.html';
const pageParser = new PageParser();
const ripeFruitsPage = pageParser.getPage(ripeFruitsPageUrl)
    .then((riperFruitsPageHtml) => {
        return pageParser.selectHtml(riperFruitsPageHtml, '#productLister > ul')
    })
    .then((ripeFruitsProductListHtml) => {
        const ripeFruitsProductListParser = new ProductListParser(ripeFruitsProductListHtml);
        return ripeFruitsProductListParser.getProductsFromHtml(ripeFruitsProductListHtml);
    })
    .then((ripeFruitsProductList) => {
        console.log(ripeFruitsProductList);
        let promises = [];
        _.each(ripeFruitsProductList.products, (product) => {
            promises.push(pageParser.getPage(product.link));
        });

        return Promise.all(promises, ripeFruitsProductList)
    })
    .then((resolvedPromises, ripeFruitsProductList) => {
        _.each(resolvedPromises, (ripeFruitProductPageHtml) => {
            console.log(Buffer.byteLength(ripeFruitProductPageHtml, 'utf8') + " bytes");
            //pageParser.selectHtml()
        });
    })
    .catch((error) => {
        debug(new Date(), 'Oops something went wrong : ' + error);
    });
