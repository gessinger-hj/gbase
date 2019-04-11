#!/usr/bin/env node

const chai   = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const sinon  = require("sinon");

let g        = require  ( "../index.js" ) ;
let path     = require  ( "path" ) ;
let os       = require  ( "os" ) ;

let testCaseName = "all";
let testCases = [ "resolve", "isLocalHost", "RFC3339", "all" ] ;

if ( testCaseName === "all" )
{
  for ( let i = 0 ; i < testCases.length ; i++ )
  {
    test ( testCases[i] ) ;
  }
}
else
{
  test ( testCaseName ) ;
}

function test ( testCaseName )
{
  if ( testCaseName === "isLocalHost" )
  {
    describe("gepard", function() {
      const hostname = os.hostname();
      it("gepard.isLocalHost('" + hostname + "')", function(done) {
        g.isLocalHost ( hostname, function ( err, p )
        {
          if ( p != true ) done(new Error("localhost should be Roma"));
          else done();
        }) ;
      });
    });
  }
  else
  if ( testCaseName === "RFC3339" )
  {
    // describe("RFC3339", function() {
    //   it("date.toRFC3339String()", function() {
    //     let s = "2018-09-21T16:20:39.795+02:00" ;
    //     let d = new Date ( s );
    //     assert.equal(s, d.toRFC3339String());
    //   });
    // });
  }
  else
  if ( testCaseName === "resolve" )
  {
    describe("gepard", function() {
      it("resolve environment variables in object", function() {
        let o =
        {
          "connectionHook": "XmpConnectionHook.js"
        , "heartbeatMillis": 10000
        , "tasks": {
            "rule": "XmpTaskRule"
          , "list": [
            { "name":"ack"
            , "rule":"XmpTaskRule"
            , "stepList": [
                { "name": "req1", "rule":"%JAVA_HOME%" }
              , { "name": "req2", "rule":"null" }
              ]
            }
          ]
          }
        };
        var newName = "" ;
        g.visit ( o, function ( oo )
        {
          if ( Array.isArray ( oo ) )
          {
            return ;
          }
          for ( var key in oo )
          {
            if ( typeof oo[key] !== 'string' ) continue ;
            if ( oo[key].indexOf ( '%' ) < 0 ) continue ;
            oo[key] = g.resolve ( oo[key], {} ) ;
            newName = oo[key];
          }
        });
        assert(newName.length > 0, true);
      });
    });
  }
  else
  {
    return false ;
  }
  return true ;
}
function usage()
{
  console.log ( "Tango.test.js" ) ;
  console.log ( "Usage: Tango.test.js <test-case-name>" ) ;
  console.log ( "Test-cases are:" ) ;
  for ( var i = 0 ; i < testCases.length ; i++ )
  {
    console.log ( "  " + testCases[i] ) ;
  }
}
