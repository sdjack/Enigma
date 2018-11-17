/**
* File generated using NSU © 2016 Steven Jackson
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

// ADD PROTOTYPE LOGIC HERE
CONSTRUCT.prototype.addProfile = function (input, cb) {
  //console.log(input);
  var passString = String(input.passWord);
  var passEncypted = this.cypher.encrypt(passString);
  input.token = passEncypted;
  input.passWord = passEncypted;
  this.db.procs.CreateUser(input, cb);
};

// ADD PROTOTYPE LOGIC HERE
CONSTRUCT.prototype.addTokenProfile = function (input, cb) {
  //console.log(input);
  var tokenString = String(input.token);
  input.passWord = tokenString;
  this.db.procs.CreateUser(input, cb);
};

CONSTRUCT.prototype.initialize = function () {
    this.db = this.using('database');
    this.cypher = this.using('cypher');
    require('./middleware.js')(this);
};

exports.service = CONSTRUCT;
