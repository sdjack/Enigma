/**
* File generated using ENIGMA © 2016 Steven Jackson
*
*/

var CONFIG_SETTINGS = require('./config.js').settings;

// SERVICE CONSTRUCT
var CONSTRUCT = function (group, id) {
  this.settings = CONFIG_SETTINGS;
  this.ID = id;
  this.GROUP = group;
  this.URI = group + id;
  // ADD CONSTRUCT LOGIC HERE
};

CONSTRUCT.prototype.userLogin = function (input, cb) {
  var passString = String(input.passWord);
  var passEncypted = this.cypher.encrypt(passString);
  input.token = passEncypted;
  input.passWord = passEncypted;
  this.db.procs.UserLogin(input, cb);
};

CONSTRUCT.prototype.userLogout = function (input, cb) {
  this.db.procs.UserLogout(input, cb);
};

CONSTRUCT.prototype.userTokenLogin = function (input, cb) {
  var tokenString = String(input.token);
  input.passWord = tokenString;
  this.db.procs.UserLogin(input, cb);
};

CONSTRUCT.prototype.initialize = function () {
  this.db = this.using('database');
  this.cypher = this.using('cypher');
  require('./middleware.js')(this);
};

exports.service = CONSTRUCT;
