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

// ADD PROTOTYPE LOGIC HERE
CONSTRUCT.prototype.getProfile = function (un, cb) {
  if (typeof (un) !== 'undefined') {
    var self = this,
    sql = "SELECT TOP 1 * FROM dbo.Profiles WHERE USERNAME = N'" + un + "'";
    self.db.query(sql, cb);
  }
};

CONSTRUCT.prototype.getAvatar = function (un, cb) {
  if (typeof (un) !== 'undefined') {
    var self = this,
    sql = "SELECT TOP 1 AVATAR FROM dbo.Profiles WHERE USERNAME = N'" + un + "'";
    self.db.query(sql, cb);
  }
};

CONSTRUCT.prototype.getFriendRequests = function (input, cb) {
  this.db.procs.GetFriendRequests(input, cb);
};

CONSTRUCT.prototype.initialize = function () {
    var self = this;
    // ADD ANY INITIALIZE LOGIC HERE
    this.db = this.using('database');
    // FINALLY, LOAD SERVICE MIDDLEWARE
    require('./middleware.js')(self);
};

exports.service = CONSTRUCT;
