#!/usr/bin/env node

var fs = require ( "fs" ) ;
var g = require ( "gbase" ) ;

var Encryptor = require('file-encryptor');
var path = require('path');

var inp = g.getProperty ( "in" ) ;
var out = g.getProperty ( "out" ) ;
var key = g.getProperty ( "key" ) ;

Encryptor.decryptFileToStdout = function(inputPath, key, options, callback) {
	var crypto = require('crypto') ;

  if(typeof options === 'function') {
    callback = options;
    options = {};
  }

  options = Encryptor.combineOptions(options);

  var keyBuf = new Buffer(key);

  var inputStream = fs.createReadStream(inputPath);
  var outputStream = process.stdout;
  var cipher = crypto.createDecipher(options.algorithm, keyBuf);

  inputStream.on('data', function(data) {
    var buf = new Buffer(cipher.update(data), 'binary');
    outputStream.write(buf);
  });

  inputStream.on('end', function() {
    try {
      var buf = new Buffer(cipher.final('binary'), 'binary');
      outputStream.write(buf);
      return callback();
    } catch(e) {
      return callback(e);
    }
  });
};
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
	console.log ( "version: 1.0" ) ;
	process.exit ( 0 ) ;
}
if ( g.getProperty ( "help" ) || process.argv.length === 2 )
{
	usage() ;
}
var outputToStdout = false ;
if ( !inp && !out )
{
	var file = process.argv[2] ;
	if ( fs.existsSync(file) )
	{
	  inp = file ;
	  if ( inp.endsWith ( ".X" ) )
	  {
	    outputToStdout = true ;
	  }
	}
}
if ( ! key )
{
	var prompt = require('cli-prompt');
	prompt.password ( 'pwd: ', (pwd, res ) => {
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
		if ( outputToStdout )
		{
			Encryptor.decryptFileToStdout ( inp, key, function(err) {
				process.exit() ;
			});
		}
		else
		{
			Encryptor.decryptFile ( inp, out, key, function(err) {
				if ( err )
			  	console.log ( err ) ;
				else
					console.log ( "done" ) ;
			});
		}
	}
	else
	{
		if ( !out ) out = inp + ".X" ;
		Encryptor.encryptFile ( inp, out, key, function(err) {
			if ( err )
		  	console.log ( err ) ;
			else
				console.log ( "done" ) ;
		});
	}
}
