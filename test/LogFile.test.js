#!/usr/bin/env node

const chai   = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const sinon  = require("sinon");
const os     = require("os");
const path   = require("path");

//let g        = require  ( "gbase" ) ;
let g        = require  ( "../index.js" ) ;

// mocha -G -w --recursive --reporter tap test
describe("LogFile", function() {
  let file = new g.File(os.tmpdir(), "gbase-test");
  var Log = g.LogFile; //org.gessinger.tangojs.LogFile ;
let logFile = new g.File(file, "Log.test.log");
console.log ( "Log=" + Log ) ;
  const log = Log.createInstance() ;
  file.mkdirs();
  log.init ( `level=notice,file=${logFile}` ) ;
  it("init", function() {
  
    log.emergency ( "-emergency---------------" ) ;
    log.alert ( "-alert---------------" ) ;
    log.critical ( "-critical---------------" ) ;
    log.debug ( "-debug---------------" ) ;
    log.setLevel ( log.LogLevel.DEBUG ) ;
    log.error ( "-error---------------" ) ;
    log.warning ( "-warning---------------" ) ;
    log.info ( "-info---------------" ) ;
    log.notice ( "-notice---------------" ) ;
    log.debug ( "-debug---------------" ) ;
    log.redirectOutput() ;
    console.log ( "4 ---- console.log ---------" ) ;
    console.error ( "4 ---- console.error ---------" ) ;
    console.warn ( "4 ---- console.warn ---------" ) ;
    console.info ( "4 ---- console.info ---------" ) ;
    process.stdout.write ( "5 ---- write ---------\n" ) ;
    log.unredirectOutput() ;
  });
  it("check size", function(done) {
    setTimeout( () => {
      const fsize = logFile.length();
      console.log ( "fsize=" + fsize ) ;
      done();
    }, 1000 );
  });
});
