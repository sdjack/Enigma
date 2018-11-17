var path = require('path'),
frameworkDir = path.normalize(__dirname + '/../../'),
discuss = require(frameworkDir + '/helpers/discuss.js');

var responseBuilder = function (words) {
  if (!words) { return ''; }
	var input = words.join(' '),
  outbound = discuss.autoResponse(input);
	return outbound;
};

var command_action = function (args, cb) {
  if (args.words) {
    this.log(responseBuilder(args.words));
  }
  cb();
};

var COMMAND_CONSTRUCT = function () {
  this.catch = '[words...]';
  this.action = command_action;
};

exports.plugin = new COMMAND_CONSTRUCT();
