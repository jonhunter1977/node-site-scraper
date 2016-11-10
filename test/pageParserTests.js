'use strict';

const should = require('should');
const fs = require('fs');
const rewire = require('rewire');
const deride = require('deride');

const PageParser = rewire('../pageParser');

describe('pageParser', function() {

    const testHtml = fs.readFileSync('./test/test_data/test-scraped-page.html', 'utf8');

    beforeEach(() => {
        //Create the stub object using deride and add the stub methods you want to the object
        const webRequest = deride.stub(['getBodyFromUrl']);
        webRequest.setup.getBodyFromUrl.toResolveWith(testHtml);

        //Wrap the stub in a function so it behaves like a class
        const WebRequest = function () { return webRequest; };

        //rewire the WebRequest object on the PageParser
        //TODO webRequest needs to be a function which returns the mock object with the getPage method
        PageParser.__set__('WebRequest', WebRequest);
    });

    describe('getPage', () => {

        it('should return the expected html', () => {
            const pageParser = new PageParser();
            return pageParser.getPage('').should.be.fulfilled(testHtml);
        });
    });

    describe('selectHtml', function() {

        it('should return a <ul> with 7 <li> elements', () => {
            const pageParser = new PageParser();
            return pageParser.selectHtml(testHtml, '#productLister > ul')
                .then((selectedHtml) => {
                    console.log(selectedHtml.text);
                    selectedHtml.
                    selectedHtml.length.should.eql(7);
                });
        });
    });
});
