const assert = require('assert');
const apiCalls = require('../src/api/arxivApi')

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

describe('API Call Tests', () => {
    describe('Calling getOneArticleGivenId', () => {
        it('Should return a value given a known article ID', () => {
            apiCalls.getOneArticleGivenId((article) => {
                console.log('article', article)
                // assert.deepStrictEqual(article.id)
            }, "2011.05595v1")
        });
    });
});




