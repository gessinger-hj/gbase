/*
* @Author: Hans Jürgen Gessinger
* @Date:   2019-04-05 18:55:16
* @Last Modified by:   Hans Jürgen Gessinger
* @Last Modified time: 2019-04-05 19:26:26
*/

'use strict';

const assert = require('assertthat');

const calculator = require('../src/calculator');

test('add returns the sum of the given numbers.', () => {
	const sum = calculator.add(23, 42);
	assert.that(sum).is.equalTo(65);
});

test('add throws error if no numbers are given.', () => {
	assert.that(() => {
			const sum = calculator.add();
		}).is.throwing('Numbers are missing.');
});
