#!/usr/bin/env node

var g = require ( "gbase" ) ;

var encryptor = require('file-encryptor');
var path = require('path');

var inp = g.getProperty ( "in" ) ;
var out = g.getProperty ( "out" ) ;
var key = g.getProperty ( "key" ) ;

usage = function ( str )
{
	if ( str )
	{
	  console.log ( str ) ;
	  console.log() ;
	}
	console.log ( "fenc - encrypt / decrypt a file" ) ;
	console.log ( "Usage: node fenc --in=<file> --out=<file> --key=<key>" ) ;
	process.exit ( 0 ) ;
}
if ( ! key )
{
	var prompt = require('prompt');
	prompt.message = 'Please enter' ; 
	prompt.start() ;
	prompt.get ( { name:'pwd', description:'password', hidden: true, required: true }, (err, res ) => {
		key = res.pwd ;
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
