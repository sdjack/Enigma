var winston = require('winston'),
path = require('path'),
logDir = path.normalize(__dirname + '/../../logs');

var getLogFileName = function (id) {
  var today = new Date(),
  dd = today.getDate(),
  mm = today.getMonth()+1,
  yyyy = today.getFullYear(),
  fileName = logDir + '/' + id;
  dd = (dd < 10) ? '0' + dd: dd;
  mm = (mm < 10) ? '0' + mm: mm;
  fileName += '_' + mm + dd + yyyy + '.log';
  return fileName;
};

exports.createNewLogger = function (id) {
  winston.loggers.add('enigma-' + id + '-logger', {
    transports: [
      new (winston.transports.File)({
        name: 'debug-enigma-' + id + '-file',
        filename: getLogFileName(id + '-debug'),
        level: 'debug'
      }),
      new (winston.transports.File)({
        name: 'error-enigma-' + id + '-file',
        filename: getLogFileName(id + '-error'),
        level: 'error'
      })
    ]
  });

  return winston.loggers.get('enigma-' + id + '-logger');
};
