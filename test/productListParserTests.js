'use strict';

const should = require('should');
var fs = require('fs');
const ProductListParser = require('../productListParser');

describe('productListParser', () => {

    const testProductListHtml = fs.readFileSync('./test/test_data/test-scraped-product-list.html', 'utf8');

    describe('getProductsFromHtml', () => {

        it('should return 7 products', () => {

            const productListParser = new ProductListParser();
            productListParser.getProductsFromHtml(testProductListHtml)
                .then((productList) => {
                    console.log(productList);
                    productList.products.length.should.eql(7);
                });
        });
    });
});
