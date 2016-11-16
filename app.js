'use strict';

const debug = require('debug')('node-site-scraper:app');
const Promise = require('bluebird');
const _ = require('lodash');
const PageParser = require('./pageParser');
const ProductListParser = require('./productListParser');
const ProductDataBuilder = require('./productDataBuilder');

const ripeFruitsPageUrl = 'http://hiring-tests.s3-website-eu-west-1.amazonaws.com/2015_Developer_Scrape/5_products.html';
const pageParser = new PageParser();
const productDataBuilder = new ProductDataBuilder();
const ripeFruitsPage = pageParser.getPage(ripeFruitsPageUrl)
    .then((riperFruitsPageHtml) => {
        return pageParser.selectHtml(riperFruitsPageHtml, '#productLister > ul')
    })
    .then((ripeFruitsProductListHtml) => {
        const ripeFruitsProductListParser = new ProductListParser(ripeFruitsProductListHtml);
        return ripeFruitsProductListParser.getProductsFromHtml(ripeFruitsProductListHtml);
    })
    .then((ripeFruitsProductList) => {
        const promises = _.map(ripeFruitsProductList.products, (product) => {
            return productDataBuilder.buildProductData(product);
        });

        return Promise.all(promises);
    })
    .then((resolvedPromises) => {
        const finalData = {};

        finalData.results = _.map(resolvedPromises, (builtProduct) => {
            return builtProduct;
        })

        finalData.total = productDataBuilder.getTotalCostOfProducts(finalData.results);

        debug('=======================================');
        debug('Product detail on page is as follows');
        debug('=======================================');
        debug('\n', finalData);
        debug('=======================================');

    })
    .catch((error) => {
        debug(new Date(), 'Oops something went wrong : ' + error);
    });
