﻿// FETCH DEPENDENCIES AND SET VARS
var CONFIG_SETTINGS = require('./config.js').settings,
connectionPool = require('tedious-connection-pool'),
driver = require('tedious'),
path = require('path'),
frameworkDir = path.normalize(__dirname + '/../../'),
logging = require(frameworkDir + '/helpers/logging.js'),
logger = logging.createNewLogger('database');
/**
* EXAMPLE QUERY TO GET DATATYPES
*
* SELECT COLUMN_NAME,DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'USER_ACCESS' AND TABLE_SCHEMA='dbo'
*/

/**
 EXAMPLE QUERY OBJECT

var QUERY = {
  COLUMNS: [],
  TABLES: [],
  JOINS: [],
  WHERES: [],
  GROUPBY: [],
  ORDERBY: [],
};
*/

var buildSelectQuerySQL = function (query) {
  if (typeof (query) === 'string') {
    return query;
  }
  if (!query.TABLES) return false;
  var _tmp = [],
  sql = '';

  if (query.COLUMNS) {
    _tmp = [];
    query.COLUMNS.forEach(function (str) {
      _tmp.push(str);
    });
    sql += "SELECT " + _tmp.join();
  } else {
    sql += "SELECT *";
  }

  _tmp = [];
  query.TABLES.forEach(function (str) {
    _tmp.push(str);
  });
  sql += " FROM " + _tmp.join();

  if (query.JOINS) {
    _tmp = [];
    query.JOINS.forEach(function (str) {
      var j = "JOIN " + str;
      _tmp.push(j);
    });
    sql += _tmp.join();
  }

  if (query.WHERES) {
    _tmp = [];
    query.WHERES.forEach(function (str) {
      _tmp.push(str);
    });
    sql += " WHERE " + _tmp.join(" AND ");
  }

  if (query.GROUPBY) {
    _tmp = [];
    query.GROUPBY.forEach(function (str) {
      _tmp.push(str);
    });
    sql += " GROUP BY " + _tmp.join();
  }

  if (query.ORDERBY) {
    _tmp = [];
    query.ORDERBY.forEach(function (str) {
      _tmp.push(str);
    });
    sql += " ORDER BY " + _tmp.join();
  }
  return sql;
};

var buildInsertQuerySQL = function (query) {
  if (typeof (query) === 'string') {
    return query;
  }

  if (!query.TABLES || !query.COLUMNS || !query.VALUES) return false;
  var _tmpCols = [],
  _tmpVals = [],
  _tmpStr = '',
  sql = "INSERT INTO ";

  query.TABLES.forEach(function (str) {
    _tmpStr = str;
  });
  sql += _tmpStr + " (";

  query.COLUMNS.forEach(function (str) {
    _tmpCols.push(str);
  });
  query.VALUES.forEach(function (str) {
    _tmpVals.push("N'" + str + "'");
    //_tmpVals.push("@" + str.toLowerCase());
  });
  sql += _tmpCols.join() + ") OUTPUT INSERTED.id VALUES (" + _tmpVals.join() + ");";

  return sql;
};

/**
* RESULT OBJECT CONSTRUCTOR
*/
var newResult = function (sql) {
		return {
      sql: sql || "",
      response: "",
      data: [],
      failed: false
    };
};
var newDebugResult = function (sql) {
		return {
      sql: sql || "",
      response: "",
      debug: {},
      data: [],
      failed: false
    };
};

// CONSTRUCT THE CONTROLLER MODULE

var CONSTRUCT = function (id) {
	this.settings = CONFIG_SETTINGS;
  this.ID = id;
  this.environment = null;
  this.procs = {};
};

CONSTRUCT.prototype.enableDebugging = function() {
  this.settings.debugging = true;
};

CONSTRUCT.prototype.disableDebugging = function() {
  this.settings.debugging = true;
};

CONSTRUCT.prototype.request = function(results, callback) {
    var self = this;
    self.pool.acquire(function (err, connection) {
        if (err) {
            logger.error('Acquire', err);
            results.response = err;
            results.failed = true;
            if (typeof (callback) !== 'undefined') {
              callback(results);
            } else {
              return;
            }
        }

        var request = new driver.Request(results.sql, function (err, rowCount) {
          if (self.settings.debugging) {
              console.log("\n\n");
              console.log(results.sql);
          }
          if (err) {
            logger.error('Request', err);
            results.response = err;
            results.failed = true;
            if (self.settings.debugging) {
                console.log("\n");
                console.log(err);
            }
          }
          if (typeof (callback) !== 'undefined') {
            // if (self.settings.debugging) {
            //     console.log("\n");
            //     console.log(results);
            // }
            callback(results);
          }
          connection.release();
        });

        request.on('debug', function (err) {
          logger.error('Debug', err);
          results.response = err;
          results.failed = true;
          if (typeof (callback) !== 'undefined') {
            callback(results);
          }
        });

        request.on('row', function (columns) {
          var rowData = {};
          columns.forEach(function (column) {
            rowData[column.metadata.colName] = (column.value !== null) ? column.value : "";
          });
          results.data.push(rowData);
        });

        if (typeof (connection) !== 'undefined') {
          connection.execSql(request);
        }
    });
};

CONSTRUCT.prototype.query = function (context, callback) {
  var results;
  if (!context || typeof (context) === 'undefined') {
    results = newResult('');
    logger.error('Query', 'Invalid SQL');
    results.response = 'Invalid SQL';
    if (typeof (callback) !== 'undefined') {
      callback(results);
    }
  } else {
    results = newResult(buildSelectQuerySQL(context));
    this.request(results, callback);
  }
};

CONSTRUCT.prototype.insert = function (context, callback) {
  var results;
  if (!context || typeof (context) === 'undefined') {
    results = newResult('');
    logger.error('Query', 'Invalid SQL');
    results.response = 'Invalid SQL';
    if (typeof (callback) !== 'undefined') {
      callback(results);
    }
  } else {
    results = newResult(buildInsertQuerySQL(context));
    this.request(results, callback);
  }
};

CONSTRUCT.prototype.initialize = function () {
    var self = this,
        server = self.using('ENIGMA');
    self.environment = server.settings.environment;

    // CREATE A POOL FOR EACH DATA TYPE
    var connConfig = self.settings.instances[self.environment],
    poolConfig = self.settings.poolConfig;
    self.pool = new connectionPool(poolConfig, connConfig);
    self.pool.on('connect', function (err) {
      if (err) {
        logger.error('Connection Event (connect)', err);
        process.exit(1);
      }
      self.ready = true;
    });

    self.pool.on('error', function (err) {
      logger.error('Connection Event (error)', err);
    });

    if (self.settings.verboseLogging) {
        self.pool.on('debug', function (msg) {
          logger.debug('Connection Event (debug)', msg);
        });
        self.pool.on('infoMessage', function (msg) {
          logger.debug('Connection Event (infoMessage)', msg);
        });
        self.pool.on('errorMessage', function (err) {
          logger.error('Connection Event (errorMessage)', err);
        });
    }
    // END POOL CREATION

    self.socket = self.using('socket');

    var procs = require('./procs.js').procs;
    self.procs = new procs(self);

    var models = require('./models.js').models;
    self.models = new models();

    //logger.debug('Controller Initialized');
};

exports.controller = CONSTRUCT;
