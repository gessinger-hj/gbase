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
    o = {
      emergency: (t) => {
        console.log ( "t=" + t ) ;
      }
    }
    log.setLogger ( o ) ;
    log.emergency ( "-emergency---------------" ) ;

    let testFile = new g.File(logFile);
    // let b = testFile.exists();
    // console.log ( "b=" + b ) ;
    // let fileContent = testFile.getString();
    // console.log ( "fileContent=" + fileContent ) ;
  });
});

//   Log.init ( "redirect=3+,level=notice,file=Log-%DATE%.log" ) ;
//   
//   Log.emergency ( "-emergency---------------" ) ;
//   Log.alert ( "-alert---------------" ) ;
//   Log.critical ( "-critical---------------" ) ;
// Log.setLevel ( Log.LogLevel.DEBUG ) ;
//   Log.error ( "-error---------------" ) ;
//   Log.warning ( "-warning---------------" ) ;
//   Log.info ( "-info---------------" ) ;
//   Log.notice ( "-notice---------------" ) ;
//   Log.debug ( "-debug---------------" ) ;
//   console.log ( "1 ---- console.log ---------" ) ;
//   // Log.redirectOutput() ;
//   console.log ( "%sXXX", "2 ---- console.log ---------" ) ;
//   console.log ( "3 ---- console.log ---------" ) ;
//   // Log.unredirectOutput() ;
//   console.log ( "4 ---- console.log ---------" ) ;
//   console.error ( "4 ---- console.error ---------" ) ;
//   console.warn ( "4 ---- console.warn ---------" ) ;
//   console.info ( "4 ---- console.info ---------" ) ;
//   process.stdout.write ( "5 ---- write ---------\n" ) ;
