var stream = require('stream');
var util = require('util');

'use strict';

/**
 * Byte based readable stream.
 *
 * @class      BytesReadable (name)
 */
class BytesReadable extends stream.Readable {

  constructor ( bufferOrString ) {

    if ( typeof bufferOrString === 'string' ) {
      bufferOrString = Buffer.from ( bufferOrString, 'binary' ) ;
    }
    super() ;

    this._buffer = bufferOrString ;
    this.done = false ;
  }

  _read ( size ) {
    if ( this.done ) {
      this.push ( null ) ;
      return ;
    }
    this.push ( this._buffer ) ;
    this.done = true ;
  }

  toString() {
    return this._buffer.toString() ;
  }

  getBuffer() {
    return this._buffer ;
  }

}

module.exports = BytesReadable ;

if ( require.main === module ) {
  t ( Buffer.from ( [ 48, 49, 50, 52 ] ) ) ;
  // t ( 'tÜext' ) ;

  function t ( obj ) {
    console.log ( obj ) ;
    var r = new BytesReadable ( obj ) ;
    console.log ( r._buffer ) ;
    r.on ( 'data', data => {
      console.log ( data ) ;
    }) ;

    var r1 = new BytesReadable ( obj ) ;
    for ( var i = 0 ; i < 100 ; i++ ) {
      var c = r1.read ( 1 ) ;
      console.log ( "typeof(c)=" + typeof(c) ) ;
      if ( c === null ) break ;
      console.log ( c ) ;
    }
  }
}
