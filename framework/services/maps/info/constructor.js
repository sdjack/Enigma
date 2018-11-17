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
CONSTRUCT.prototype.getMapNodes = function (input, cb) {
  this.db.procs.GetAreaNodes(input, cb);
};

CONSTRUCT.prototype.getDataBundle = function (input, cb) {
  this.db.procs.GetDataBundle(input, cb);
};

CONSTRUCT.prototype.getMapSubDivision = function (input, cb) {
  this.db.procs.GetSubDivisionNodes(input, cb);
};

CONSTRUCT.prototype.getHeatMap = function (input, cb) {
  this.db.procs.GetHeatMapData(input, cb);
};

CONSTRUCT.prototype.getJsonLayer = function (input, cb) {
  this.db.procs.GetGeoJSON(input, cb);
};

CONSTRUCT.prototype.getAnonymousLocation = function (input, cb) {
  this.db.procs.GetAnonymousLocation(input, cb);
};

CONSTRUCT.prototype.getEventList = function (input, cb) {
  this.db.procs.GetEventList(input, cb);
};

CONSTRUCT.prototype.initialize = function () {
    var self = this;
    // ADD ANY INITIALIZE LOGIC HERE
    this.db = this.using('database');
    // FINALLY, LOAD SERVICE MIDDLEWARE
    require('./middleware.js')(self);
};

exports.service = CONSTRUCT;
