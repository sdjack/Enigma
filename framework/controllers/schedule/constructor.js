﻿// FETCH DEPENDENCIES AND SET VARS
var CONFIG_SETTINGS = require('./config.js').settings,
fs = require('fs'),
path = require('path'),
http = require('http'),
frameworkDir = path.normalize(__dirname + '/../../'),
logging = require(frameworkDir + '/helpers/logging.js'),
logger = logging.createNewLogger('schedule'),
today = new Date();

// CONSTRUCT THE CONTROLLER MODULE
var CONSTRUCT = function (id) {
    this.settings = CONFIG_SETTINGS;
    this.ID = id;
    //logger.debug('Services Controller Created');
};

CONSTRUCT.prototype.createTask = function (timeRule, callback) {
  this.schedule.scheduleJob(timeRule, callback);
};

CONSTRUCT.prototype.initialize = function () {
  this.schedule = require('node-schedule');
  this.db = this.using('database');
  this.socket = this.using('socket');
  this.daily = new this.schedule.RecurrenceRule();
  this.daily.hour = 24;

  // LOAD ALL SCHEDULED TASKS
  require('./tasks.js').tasks(this);
};

exports.controller = CONSTRUCT;
