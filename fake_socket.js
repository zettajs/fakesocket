var stream = require('stream');
var util = require('util');

var FakeSocket = module.exports = function() {
  this.data = [];
  stream.Duplex.call(this);
};
util.inherits(FakeSocket, stream.Duplex);

FakeSocket.prototype.setTimeout = function() { };
FakeSocket.prototype.destroy = function() { };

FakeSocket.prototype._read = function(n) {
  if (!this.data.length) {
    return null;
  }

  var bytes = this.data.shift();
  return this.unshift(bytes);
};

FakeSocket.prototype._write = function(chunk, encoding, cb) {
  if (!chunk || chunk == 0) {
    return cb();
  }
  this.data.push(chunk);

  cb();
};