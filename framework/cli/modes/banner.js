var ascii = require('../helpers/ascii.js').plugin;

var mode_init = function (args, cb) {
    this.log('Welcome to Banner mode.\nYou can now directly enter text to convert into console banners.\n To exit, type `exit`.');
    ascii.pattern = args.style;
    cb();
};

var mode_action = function (command, cb) {
    this.log(ascii.banner(command));
    cb();
};

var MODE_CONSTRUCT = function () {
  this.mode = 'banner [style]';
  this.description = 'Convert text into console banners';
  this.delimiter = 'banner: ';
  this.init = mode_init;
  this.action = mode_action;
};

exports.plugin = new MODE_CONSTRUCT();
