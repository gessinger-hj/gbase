const chai   = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const sinon  = require("sinon");
const os     = require("os");
const path   = require("path");

//let g        = require  ( "gbase" ) ;
let g        = require  ( "../index.js" ) ;

// mocha -G -w --recursive --reporter tap test
describe("Create an instance of CryptorIV", function() {
  it("should return a new instance of CryptorIV", function() {
  	var civ = new g.CryptorIV();
  	assert.isTrue(civ instanceof g.CryptorIV, "is instance of CryptorIV");
  });
});
