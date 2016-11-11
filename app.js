const Promise = require('bluebird');
const PageParser = require('./pageParser');
const debug = require('debug')('node-site-scraper:app');

debug(new Date(), 'Start scrape');

const ripeFruitsPageUrl = 'http://hiring-tests.s3-website-eu-west-1.amazonaws.com/2015_Developer_Scrape/5_products.html';
const ripeFruitsPageParser = new PageParser();
const ripeFruitsPage = ripeFruitsPageParser.getPage(ripeFruitsPageUrl)
    .then((riperFruitsPageHtml) => {
        ripeFruitsPageParser.selectHtml(riperFruitsPageHtml, '#productLister > ul')
    })
    .then((productListSection) => {
        debug(debug(new Date(), 'All done!'));
    })
    .catch(() => {
        debug(debug(new Date(), 'Oops something went wrong'));
    });
