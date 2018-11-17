module.exports = function (vorpal) {
  var cmd_catch = require('./catch.js').plugin;

  vorpal
      .catch(cmd_catch.catch)
      .action(cmd_catch.action);
};
