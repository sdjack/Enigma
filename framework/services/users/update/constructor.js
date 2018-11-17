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
CONSTRUCT.prototype.updateProfile = function (input, cb) {
  this.db.procs.UpdateUserProfile(input, cb);
};

CONSTRUCT.prototype.updateAvatar = function (input, cb) {
  this.db.procs.UpdateUserAvatar(input, cb);
};

CONSTRUCT.prototype.updateStatus = function (input, cb) {
  this.db.procs.UpdateUserStatus(input, cb);
};

CONSTRUCT.prototype.updateHometown = function (input, cb) {
  this.db.procs.UpdateUserHometown(input, cb);
};

CONSTRUCT.prototype.updateLocation = function (input, cb) {
  this.db.procs.UpdateUserLocation(input, cb);
};

CONSTRUCT.prototype.sendFriendRequest = function (input, cb) {
  this.db.procs.SendFriendRequest(input, cb);
};

CONSTRUCT.prototype.updateFriendRequest = function (input, cb) {
  this.db.procs.UpdateFriendRequest(input, cb);
};

CONSTRUCT.prototype.initialize = function () {
    var self = this;
    // ADD ANY INITIALIZE LOGIC HERE
    this.db = this.using('database');
    this.socket = this.using('socket');
    // FINALLY, LOAD SERVICE MIDDLEWARE
    require('./middleware.js')(self);
};

exports.service = CONSTRUCT;
