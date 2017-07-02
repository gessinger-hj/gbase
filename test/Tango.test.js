#!/usr/bin/env node

let g    = require  ( "gbase" ) ;
let path = require  ( "path" ) ;

let testCaseName = process.argv[2]

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
  if ( ! test ( testCaseName ) )
  {
    usage() ;
  }
}

function test ( testCaseName )
{
  if ( testCaseName === "isLocalHost" )
  {
    g.isLocalHost ( "wevli077", function ( err, p )
    {
      console.log ( "p=" + p ) ;
    }) ;
  }
  else
  if ( testCaseName === "RFC3339" )
  {
    console.log ( new Date().toRFC3339String() ) ;
  }
  else
  if ( testCaseName === "resolve" )
  {
    let o =
    {
      "XconnectionHook": "XmpConnectionHook.js"
    , "XheartbeatMillis": 10000
    , "tasks": {
        "rule": "XmpTaskRule"
      , "list": [
        { "name":"ack"
        , "Xrule":"XmpTaskRule"
        , "stepList": [
            { "name": "req1", "rule":"%HOSTNAME%" }
          , { "name": "req2", "rule":"null" }
          ]
        }
      ]
      }
    };
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
      }
    });
    g.log ( o ) ;
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
