const Promise = require('bluebird');
const pageParser = require('./pageParser');
const debug = require('debug')('node-site-scraper:app');

debug(new Date(), 'Start scrape');

const ripeFruitsPageUrl = 'http://hiring-tests.s3-website-eu-west-1.amazonaws.com/2015_Developer_Scrape/5_products.html';
const ripeFruitsPageParser = new pageParser();
const ripeFruitsPage = ripeFruitsPageParser.getProductsFromPage(ripeFruitsPageUrl)
    .then(() => {
        debug(debug(new Date(), 'All done!'));
    })
    .catch(() => {
        debug(debug(new Date(), 'Oops something went wrong'));
    });
