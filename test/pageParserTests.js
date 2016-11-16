'use strict';

const should = require('should');
const fs = require('fs');
const rewire = require('rewire');
const deride = require('deride');
const PageParser = rewire('../pageParser');

describe('pageParser', function() {

    const testScrapedPageHtml = fs.readFileSync('./test/test_data/test-scraped-page.html', 'utf8');
    const testProductListHtml = fs.readFileSync('./test/test_data/test-scraped-product-list.html', 'utf8');

    beforeEach(() => {
        //Create the stub object using deride and add the stub methods you want
        const webRequest = deride.stub(['getBodyFromUrl']);
        webRequest.setup.getBodyFromUrl.toResolveWith(testScrapedPageHtml);

        //Wrap the stub in a function so it behaves like a class
        const WebRequest = function() {
            return webRequest;
        };

        //rewire the WebRequest object on the PageParser
        PageParser.__set__('WebRequest', WebRequest);
    });

    describe('getPage', () => {

        it('should return the expected html', () => {
            const pageParser = new PageParser();
            return pageParser.getPage('').should.be.fulfilled(testScrapedPageHtml);
        });
    });

    describe('selectHtml', function() {

        it('should return the product list html', () => {
            const pageParser = new PageParser();
            const productListHtml = pageParser.selectHtml(testScrapedPageHtml, '#productLister > ul');
            should.equal(productListHtml, testProductListHtml);
        });
    });
});
