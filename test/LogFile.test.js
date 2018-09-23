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
var Log = g.LogFile; //org.gessinger.tangojs.LogFile ;
console.log ( "Log=" + Log ) ;
describe("LogFile", function() {
  it("init", function() {
    const log = Log.createInstance() ;
    let file = new g.File(os.tmpdir(), "gbase-test");
    file.mkdirs();
    let logFile = new g.File(file, "Log.test.log");
    log.init ( `level=notice,file=${logFile}` ) ;
  
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
    console.log ( "3 ---- console.log ---------" ) ;
    console.log ( "4 ---- console.log ---------" ) ;
    console.error ( "4 ---- console.error ---------" ) ;
    console.warn ( "4 ---- console.warn ---------" ) ;
    console.info ( "4 ---- console.info ---------" ) ;
    process.stdout.write ( "5 ---- write ---------\n" ) ;
    log._out.on('finish', () => {
      console.error('finish complete.');
    });
    log._out.on('close', () => {
      console.error('close complete.');
    });
    log.unredirectOutput() ;
    setTimeout( () => {
      const fsize = logFile.length();
      console.log ( "fsize=" + fsize ) ;
    }, 1000 );
  });
});
