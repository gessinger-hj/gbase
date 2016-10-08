#!/usr/bin/env node

var g = require ( "gbase" ) ;

var encryptor = require('file-encryptor');
var path = require('path');

var inp = g.getProperty ( "in" ) ;
var out = g.getProperty ( "out" ) ;
var key = g.getProperty ( "key" ) ;

var usage = function ( str )
{
	if ( str )
	{
	  console.log ( str ) ;
	  console.log() ;
	}
	console.log ( "fenc - encrypt / decrypt a file" ) ;
	console.log ( "Usage: fenc args" ) ;
	console.log ( "args:    --in=<in-file>" ) ;
	console.log ( "         if <in-file> ends with .X: decrypt file" ) ;
	console.log ( "         else                         crypt file" ) ;
	console.log ( "         --out=<out-file>, for crypt:   optional with default: <in-file>.X" ) ;
	console.log ( "                           for decrypt: if <in-file> ends with .X default <in-file> minus .X" ) ;
	console.log ( "         --key=<key>, optional, if not given: prompt for password." ) ;
	process.exit ( 0 ) ;
}
if ( g.getProperty ( "help" ) )
{
	usage() ;
}
if ( ! key )
{
	var prompt = require('cli-prompt');
	prompt.password ( 'pwd: ', (pwd, res ) => {
		console.log ( "pwd=" + pwd ) ;
		console.log(res) ;
		key = pwd ;
		execute() ;
	});
}
else
{
	execute() ;
}
function execute ( )
{
	if ( !inp || !out || !key )
	{
	  if ( !inp )
	    usage ( "Missing --in=<file>" ) ;
	  if ( !key )
	    usage ( "Missing --key=<key>" ) ;
	}
	var enc = true ;
	var dec = false ;
	if ( inp.endsWith ( ".X" ) )
	{
	  enc = false ;
	  dec = true ;
	  if ( ! out )
	  {
	  	var name = path.basename ( inp ) ;
	  	out = name.substring ( 0, name.lastIndexOf ( ".X" ) ) ;
	  }
	}
	if ( dec )
	{
		if ( !out )
		{
	  	out = path.basename ( inp ) ;
		}
		encryptor.decryptFile ( inp, out, key, function(err) {
			if ( err )
		  	console.log ( err ) ;
			else
				console.log ( "done" ) ;
		});
	}
	else
	{
		if ( !out ) out = inp + ".X" ;
		encryptor.encryptFile ( inp, out, key, function(err) {
			if ( err )
		  	console.log ( err ) ;
			else
				console.log ( "done" ) ;
		});
	}
}
