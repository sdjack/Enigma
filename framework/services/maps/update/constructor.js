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

CONSTRUCT.prototype.createEvent = function (input, cb) {
  var self = this;
  self.db.procs.CreateEvent(input, function (results) {
    var socket_response = service.socket.responseEnvelope('create event', 'OK', results),
    service_response = self.responseEnvelope('/newevent', results);
    self.socket.io.emit('event created', socket_response);
    cb(service_response);
  });
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
