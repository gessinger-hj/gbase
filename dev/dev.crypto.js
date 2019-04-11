#!/usr/bin/env node

let g = require ( 'gbase' )

/*
* @Author: Hans Jürgen Gessinger
* @Date:   2019-05-21 13:46:45
* @Last Modified by:   Hans Jürgen Gessinger
* @Last Modified time: 2019-05-30 21:06:50
*/

	let inputEncoding = 'utf8'
	// let outputEncoding = 'base64'
	let outputEncoding = 'binary'

  var crypto = require('crypto');
  var key = 'SECRET';
  var text = 'ABCDEFGH';


  var md5key_hex = crypto.createHash('md5').update( key ).digest("hex") ;
  console.log ( "md5key_hex(hex)=" + md5key_hex ) ;
  console.log ( "md5key_hex.length(hex)=" + md5key_hex.length ) ;
  var md5key_base64 = crypto.createHash('md5').update( key ).digest("base64") ;
  console.log ( "md5key_base64(base64)=" + md5key_base64 ) ;
  console.log ( "md5key_base64.length(base64)=" + md5key_base64.length ) ;

  console.log ( "key=" + key ) ;
  console.log ( "key.length=" + key.length ) ;

  var iv = Buffer.alloc( 8, crypto.randomBytes(8));//, 'hex' )
  var ivstring = iv.toString('hex');
  ivstring = '1234567890123456'

  let useIv = true ;
  var ivstringBuffer = Buffer.from ( ivstring, 'binary' ) ;
  console.log ( ivstringBuffer ) ;
  console.log ( ivstringBuffer.length ) ;

console.log ( "iv=" + iv ) ;
console.log ( "ivstring=" + ivstring ) ;
console.log ( "ivstring.length=" + ivstring.length ) ;
//832d5f281658fed7
console.log ( "text=" + text ) ;

	key = md5key_hex

// 1 ----------------------------------------------------------------------
  // var cipher = crypto.createCipheriv('aes256', key, ivstring)
  // cipher.update(text, inputEncoding, outputEncoding);
  // var encryptedText = cipher.final(outputEncoding);

  // var decipher = crypto.createDecipheriv('aes256', key, ivstring);
  // var txt = decipher.update ( encryptedText, outputEncoding, inputEncoding ) ;
  // txt += decipher.final ( inputEncoding ) ;
  // console.log ( "txt=" + txt ) ;

// 2 ----------------------------------------------------------------------
  var cipher2 = crypto.createCipheriv('aes256', key, ivstring)

  let inputStream = new g.BytesReadable ( text ) ;
  let outputStream = new g.BytesWritable() ;
  inputStream.on ( 'data', chunk => {
	  let buf = Buffer.from( cipher2.update ( chunk ), 'binary' );
	  outputStream.write(buf);
  });

  inputStream.on ( 'end', () => {
  	let buf = Buffer.from ( cipher2.final('binary'), 'binary');
		outputStream.write ( buf );
		outputStream.end();
	  console.log ( outputStream.getBuffer() ) ;
	
// 3 ----------------------------------------------------------------------
	  var decipher2 = crypto.createDecipheriv('aes256', key, ivstring);

	  let inputStream2 = new g.BytesReadable ( outputStream.getBuffer() ) ;
	  let outputStream2 = new g.BytesWritable() ;

	  inputStream2.on ( 'data', chunk => {
		  let buf = Buffer.from( decipher2.update ( chunk ), 'binary' );
		  outputStream2.write(buf);
	  });

	  inputStream2.on ( 'end', () => {
	  	let buf = Buffer.from ( decipher2.final('binary'), 'binary');
			outputStream2.write ( buf );
			outputStream2.end();
		  console.log ( outputStream2.getBuffer() ) ;
		  console.log ( "outputStream2=" + outputStream2 ) ;
	  });
  });

