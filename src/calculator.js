/*
* @Author: Hans Jürgen Gessinger
* @Date:   2019-04-05 18:50:25
* @Last Modified by:   Hans+JÃ¼rgen Gessinger
* @Last Modified time: 2019-09-17 12:41:58
*/
'use strict';
let assert = require('assert')
const calculator = {};

calculator.add = function(left, right)
{
	assert(typeof left === 'number' && typeof right === 'number', 'Invalid numbers')
	return left + right;
}

module.exports = calculator;