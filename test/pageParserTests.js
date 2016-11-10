'use strict';

const should = require('should');
const fs = require('fs');
const rewire = require('rewire');
const deride = require('deride');

const PageParser = rewire('../pageParser');

describe('pageParser', function() {

    let pageParser;
    const testHtml = fs.readFileSync('./test/test_data/test-scraped-page.html', 'utf8');

    beforeEach(() => {
        //Create the stub object using deride and add the stub methods you want to the object
        const webRequest = deride.stub(['getPage']);
        webRequest.setup.getPage.toResolveWith(testHtml);

        //rewire the WebRequest object on the PageParser
        PageParser.__set__('WebRequest', () => webRequest);

        pageParser = new PageParser();
    });

    describe('getPage', () => {

        it('should return the expected html', () => {
            return pageParser.getPage('').should.be.fulfilled(testHtml);
        });
    });

    describe('selectHtml', function() {

        it('should return a list of 7 elements', () => {
            return pageParser.selectHtml(testHtml, '#productLister > ul')
                .then((selectedHtml) => {
                    selectedHtml.length.should.eql(7);
                });
        });
    });
});
