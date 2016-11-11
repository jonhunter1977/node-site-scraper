'use strict';

const should = require('should');
const ProductDataBuilder = require('../productDataBuilder');

describe('productListParser', () => {

    let productDataBuilder;
    beforeEach(() => {
        productDataBuilder = new ProductDataBuilder();
    });

    describe('getTotalCostOfProducts', () => {

        it('should return the correct total cost', () => {

            const testProducts = [{
                unit_price: '3.50'
            }, {
                unit_price: '1.50',
            }, {
                unit_price: '4.56'
            }];

            const expectedTotalPrice = 9.56;
            const actualTotalPrice = productDataBuilder.getTotalCostOfProducts(testProducts);
            should.equal(actualTotalPrice, expectedTotalPrice);
        });
    });
});
