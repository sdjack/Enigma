﻿// FETCH DEPENDENCIES AND SET VARS
var CONFIG_SETTINGS = require('./config.js').settings,
fs = require('fs'),
path = require('path'),
http = require('http'),
frameworkDir = path.normalize(__dirname + '/../../'),
logging = require(frameworkDir + '/helpers/logging.js'),
logger = logging.createNewLogger('service'),
today = new Date(),
MANIFEST = { };

var requiredExists = function (dir, filename) {
  var self = this,
      found = false;

  try {
    fs.statSync(dir);
    found = true;
  } catch (e) {
    found = false;
    logger.error(dir, e);
  }
  if (found === true) {
    found = false;
    try {
      fs.statSync(dir + '/' + filename);
      found = true;
    } catch (e) {
      found = false;
      logger.error(dir + '/' + filename, e);
    }
  }
  return found;
};

var getJSONConfig = function (dir) {
  var filename = '/package.json';
  if (requiredExists(dir, filename)) {
    var pkg = require(dir + filename);
    if (pkg) {
      return pkg;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

var getDirectories = function (srcpath) {
    return fs.readdirSync(srcpath).filter(function (file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
};

var proxySetEndpoint = function (method, uri, fn) {
  var self = this,
  finalUri = self.uriPrefix;
  if (typeof(uri) === 'string') {
    finalUri += (uri.indexOf('/') !== 0) ? '/' + uri : uri;
  }
  self.setFinalEndpoint(method, finalUri, fn);
};

var proxySetEnvelope = function (context, data) {
  var self = this;
  context = context || '';
  data = data || [];
  return self.setFinalEnvelope(self.URI + context, 'OK', data);
};

// CONSTRUCT THE SERVICEGROUP MODEL
var SERVICEGROUP = function (groupName) {
  var lowID = groupName.toLowerCase();
  this.ID = lowID;
  this.uriPrefix = '/' + lowID + '/';
  this.__dir = frameworkDir + '/services/' + groupName;
  this.services = {};
};

SERVICEGROUP.prototype.addService = function (id) {
  var self = this,
  groupPrefix = self.uriPrefix;
  if (!self.services[id]) {
    var serviceDir = self.__dir + '/' + id;
    if (requiredExists(serviceDir, 'constructor.js')) {
      var pkg = getJSONConfig(serviceDir);
      var cfg = pkg.enigma;
      if (cfg && (cfg.enabled && cfg.enabled === 'true')) {
        var serviceConstruct = require(serviceDir + '/constructor.js').service;
        id = id.toLowerCase(),
        service = new serviceConstruct(groupPrefix, id);
        self.services[id] = service;
        self.services[id].uriPrefix = service.URI;
        self.services[id].using = self.using;
        self.services[id].setFinalEndpoint = self.endpoint;
        self.services[id].endpoint = proxySetEndpoint;
        self.services[id].setFinalEnvelope = self.responseEnvelope;
        self.services[id].responseEnvelope = proxySetEnvelope;
        pkg.enigma.timestamp = today.getTime();
        self.register('services', pkg);
      }
    }
  }
};

SERVICEGROUP.prototype.startService = function (id) {
  var self = this;
  if (!self.services[id] || typeof(self.services[id]) === 'undefined' || !self.services[id].initialize) {
    return false;
  }
  self.services[id].initialize();
};

SERVICEGROUP.prototype.startAll = function () {
  var self = this,
      list = self.services;
  Object.keys(list).forEach(function(key,index) {
    //logger.debug('startAll', key);
    self.startService(key);
  });
};

SERVICEGROUP.prototype.listServices = function () {
  var self = this,
      data = self.services,
      list = [];
  Object.keys(data).forEach(function(key,index) {
    list.push(key);
  });
  return list;
};

// CONSTRUCT THE CONTROLLER MODULE
var CONSTRUCT = function (id) {
    this.settings = CONFIG_SETTINGS;
    this.ID = id;
    //logger.debug('Services Controller Created');
};

// ATTACH METHODS
CONSTRUCT.prototype.addServiceGroup = function (groupName) {
  var self = this;
  if (!MANIFEST[groupName]) {
    MANIFEST[groupName] = new SERVICEGROUP(groupName);
    MANIFEST[groupName].endpoint = self.endpoint;
    MANIFEST[groupName].using = self.using;
    MANIFEST[groupName].register = self.register;
    MANIFEST[groupName].responseEnvelope = self.responseEnvelope;
  }
  return MANIFEST[groupName];
};

CONSTRUCT.prototype.newService = function (serviceName, groupName) {
  if (typeof (groupName) === 'undefined') {
    return false;
  }
  if (!MANIFEST[groupName]) {
    this.addServiceGroup(groupName);
  }
  MANIFEST[groupName].addService(serviceName);
};

CONSTRUCT.prototype.startServiceGroup = function (groupName) {
  if (MANIFEST[groupName]) {
    MANIFEST[groupName].startAll();
  } else {
    logger.error('startServiceGroup: ' + groupName + ' - Not Found');
  }
};

CONSTRUCT.prototype.listServiceGroups = function () {
  var self = this,
      list = [];
  Object.keys(MANIFEST).forEach(function(key,index) {
    list.push(key);
  });
  return list;
};

CONSTRUCT.prototype.listServicesByGroup = function (groupName) {
  var self = this,
      sGroup = MANIFEST[groupName],
      list = [];
  if (!sGroup) {
    list.push('Invalid Group');
  } else {
    list = sGroup.listServices();
  }
  return list;
};

CONSTRUCT.prototype.initialize = function () {
  var self = this,
      groupDir = frameworkDir + '/services',
      groupAarray = getDirectories(groupDir);

  if (groupAarray) {
    groupAarray.forEach(function (groupName) {
      if (groupName !== '.git') {
        var groupClass = self.addServiceGroup(groupName),
        serviceDir = groupDir + '/' + groupName,
        serviceAarray = getDirectories(serviceDir);
        if (serviceAarray) {
          serviceAarray.forEach(function (serviceName) {
            self.newService(serviceName, groupName);
          });
        } else {
          logger.error('Not Found: ' + serviceDir);
        }
      }
    });
  } else {
    logger.error('Not Found: ' + groupDir);
  }
  //logger.debug('Controller Initialized');
};

CONSTRUCT.prototype.finalize = function () {
  var self = this;
  Object.keys(MANIFEST).forEach(function(key,index) {
    self.startServiceGroup(key);
  });
};

exports.controller = CONSTRUCT;
