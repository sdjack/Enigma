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
CONSTRUCT.prototype.getChatFeed = function (input, cb) {
  this.db.procs.GetChatFeed(input, cb);
};

CONSTRUCT.prototype.getChatPreview = function (input, cb) {
  this.db.procs.GetChatPreview(input, cb);
};

CONSTRUCT.prototype.getEventPreview = function (input, cb) {
  this.db.procs.GetEventPreview(input, cb);
};

CONSTRUCT.prototype.initialize = function () {
    var self = this;
    // ADD ANY INITIALIZE LOGIC HERE
    this.db = this.using('database');
    // FINALLY, LOAD SERVICE MIDDLEWARE
    require('./middleware.js')(self);
};

exports.service = CONSTRUCT;
