module.exports = function (vorpal) {
  var mode_banner = require('./banner.js').plugin;
  
  vorpal
      .mode(mode_banner.mode)
      .description(mode_banner.description)
      .delimiter(mode_banner.delimiter)
      .init(mode_banner.init)
      .action(mode_banner.action);
};
