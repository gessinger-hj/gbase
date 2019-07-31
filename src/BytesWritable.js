var stream = require('stream');
var util = require('util');

/**
 * @constructor
 * @extends stream.Writable
 */
class BytesWritable extends stream.Writable {

  constructor() {
    super();
    this._buffer = Buffer.from ( [], 'binary' ) ;
  }

  _write ( chunk, enc, cb )
  {
    var buffer = (Buffer.isBuffer(chunk))
                  ? chunk
                    : new Buffer ( chunk, 'binary' )
               ;
    this._buffer = Buffer.concat( [ this._buffer, buffer ] ) ;
    if (cb) {
      cb();
    }
  };

  toString(encoding) {
    return this._buffer.toString(encoding) ;
  }

  getBuffer() {
    return this._buffer ;
  }

}
module.exports = BytesWritable ;

if ( require.main === module ) {
  var bytesOut = new BytesWritable() ;
  bytesOut.write ( Buffer.from([1,2,3,4,5], 'binary'), 'binary', err => {
    console.log ( err ) ;
    console.log ( "bytesOut=" + bytesOut ) ;
    console.log ( bytesOut.getBuffer() ) ;
  });
  bytesOut.on ( 'end', () => {
  });
}
