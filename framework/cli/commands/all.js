module.exports = function (vorpal) {
  var cmd_create = require('./create.js').plugin
  //,cmd_status = require('./status.js').plugin
  ;

  vorpal
      .command(cmd_create.command)
      .description(cmd_create.description)
      .action(cmd_create.action);

  // vorpal
  //     .command(cmd_status.command)
  //     .description(cmd_status.description)
  //     .action(cmd_status.action);
};
