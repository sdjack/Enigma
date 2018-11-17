require('../../../server.js');

var command_action = function (args, cb) {
    global.ENIGMA.StatusReport();
    cb();
};

var COMMAND_CONSTRUCT = function () {
  this.command = 'status';
  this.description = 'Get the current status of ENIGMA';
  this.action = command_action;
};

exports.plugin = new COMMAND_CONSTRUCT();
