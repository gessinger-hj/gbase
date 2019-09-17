/*
* @Author: Hans Jürgen Gessinger
* @Date:   2019-04-05 18:55:16
* @Last Modified by:   Hans+JÃ¼rgen Gessinger
* @Last Modified time: 2019-09-14 14:32:03
*/

'use strict';

const chai = require('chai');
const assert = require('assertthat');
const expect = chai.expect;
const should = chai.should;

const calculator = require('../src/calculator');

describe ( 'Test 1', () => {
	it('should return the sum of the given numbers.', () => {
		const sum = calculator.add(23, 42);
		assert.that(sum).is.equalTo(65);
	});
	it('should throw an error if no numbers are given.', () => {
		assert.that(() => {
				const sum = calculator.add();
			}).is.throwing('Invalid numbers');
	});
});
