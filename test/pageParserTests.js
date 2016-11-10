'use strict';

const should = require('should');
const fs = require('fs');
const rewire = require('rewire');
const deride = require('deride');

const PageParser = rewire('../pageParser');

describe('pageParser', function() {

    let pageParser;
    let returnedPageHtml;

    describe('getElementFromPage', function() {

        beforeEach(function() {
            const testData = fs.readFileSync('./test/test_data/test-scraped-page.html');

            //Create the stub object using deride and add the stub methods you want to the object
            const webRequest = deride.stub(['getBodyFromUrl']);
            webRequest.setup.getBodyFromUrl.toResolveWith(testData);

            //rewire the WebRequest object on the PageParser
            PageParser.__set__('WebRequest', () => webRequest);

            pageParser = new PageParser();
            pageParser.getPage('')
                .then((pageData) => {
                    returnedPageHtml = pageData;
                    pageParser.getPage('').should.be.fulfilled(testData);
                });
        });

        it('should return a list of 7 elements', function() {
            console.log(returnedPageHtml);
            pageParser.selectHtml(returnedPageHtml)
                .then((productList) => {
                    productList.length.should.eql(7);
                })
                .catch((error) => {
                    assert.fail();
                });
        });
    });

});
