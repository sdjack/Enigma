/**
* File generated using ENIGMA © 2016 Steven Jackson
*
*/

var crypto = require('crypto'),
CONFIG_SETTINGS = require('./config.js').settings,
path = require('path'),
frameworkDir = path.normalize(__dirname + '/../../'),
logging = require(frameworkDir + '/helpers/logging.js'),
logger = logging.createNewLogger('cypher');

// SERVICE CONSTRUCT
var CONSTRUCT = function (id) {
  this.settings = CONFIG_SETTINGS;
  this.ID = id;
  // ADD CONSTRUCT LOGIC HERE
};

// ADD PROTOTYPE LOGIC HERE
CONSTRUCT.prototype.getBuffer = function (input, callback) {
  var conf = this.settings.hashOptions;
  crypto.randomBytes(conf.saltBytes, function(err, salt) {
    if (err) {
      logger.error('getBuffer.randomBytes', err);
      callback(false);
    } else {
      crypto.pbkdf2(input, salt, conf.iterations, conf.hashBytes, conf.digest, function(err, key) {
        if (err) {
          logger.error('getBuffer.pbkdf2', err);
          callback(false);
        } else {
          var buffer = new Buffer(key.length + salt.length + 8);
          buffer.writeUInt32BE(salt.length, 0, true);
          buffer.writeUInt32BE(conf.iterations, 4, true);
          salt.copy(buffer, 8);
          key.copy(buffer, salt.length + 8);
          callback(buffer);
        }
      });
    }
  });
}

CONSTRUCT.prototype.checkBuffer = function (input, buffer, callback) {
  var conf = this.settings.hashOptions;
  var saltBytes = buffer.readUInt32BE(0);
  var hashBytes = buffer.length - saltBytes - 8;
  var iterations = buffer.readUInt32BE(4);
  var salt = buffer.slice(8, saltBytes + 8);
  var hash = buffer.toString('binary', saltBytes + 8);
  logger.debug('checkBuffer input', input);
  crypto.pbkdf2(input, salt, conf.iterations, conf.hashBytes, conf.digest, function(err, key) {
    var verified = false;
    if (err) {
      logger.error('checkBuffer.pbkdf2', err);
    } else if (key) {
      //logger.debug('checkBuffer key', key);
      verified = (key.toString('binary') === hash) ? true : false;
      //logger.debug('checkBuffer verified', verified);
    }
    callback(verified);
  });
}

CONSTRUCT.prototype.decrypt = function (input) {
  var decipher = crypto.createDecipher('aes-256-cbc', this.settings.salt);
  var decrypted = decipher.update(input, 'utf8', 'base64');
  decrypted += decipher.final('base64');
  return decrypted;
}

CONSTRUCT.prototype.encrypt = function (input) {
  var cipher = crypto.createCipher('aes-256-cbc', this.settings.salt);
  var encrypted = cipher.update(input, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

CONSTRUCT.prototype.verify = function (input, internal) {
  var self = this;
  var encrypted = self.encrypt(input);
  //logger.debug('verify encrypted', encrypted);
  //logger.debug('verify internal', internal);
  var verified = (encrypted === internal) ? true : false;
  return verified;
}

CONSTRUCT.prototype.initialize = function () {
    var self = this;
    // ADD ANY INITIALIZE LOGIC HERE

};

exports.controller = CONSTRUCT;
