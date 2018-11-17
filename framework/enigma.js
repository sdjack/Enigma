/*
 _________  __    __  ______   ______   __       __   ______
/ ████████|/██\  /██|/██████| /██████\ /██\     /██| /██████\
| ██_____/| ███\| ██|_  ██_/ /██__  ██| ███\   /███|/██__  ██|
| ██|__   | ████| ██| | ██| | ██| \__/| ████\ /████| ██| \ ██|
| █████|  | ██ ██ ██| | ██| | ██|/████| ██ ██/██ ██| ████████|
| ██__/   | ██  ████| | ██| | ██|_  ██| ██  ███| ██| ██|_  ██|
| ██|_____| ██\  ███| | ██| | ██| \ ██| ██\  █ | ██| ██| | ██|
| ████████| ██ \  ██|/██████|  ██████/| ██ \/  | ██| ██| | ██|
|________/|__/  \__/|______/ \______/ |__/     |__/|__/  |__/
*/
var fs = require('fs'),
path = require('path'),
http = require('http'),
express = require('express'),
cons = require('consolidate'),
app = express(),
swig = require('swig'),
parser = require('body-parser'),
server = app.listen(process.env.PORT || 3333),
today = new Date(),
frameworkDir = __dirname + '/',
rootDir = path.normalize(__dirname + '/../'),
logging = require(frameworkDir + '/helpers/logging.js'),
logger = logging.createNewLogger('core'),
filterSeed = require(frameworkDir + '/seeds/profanity.json'),
filter = require('profanity-filter'),
controllerDir = frameworkDir + 'controllers',
MANIFEST = {
  info: {
    controllers: [],
    services: [],
    endpoints: []
  },
  modules: {
    server: server,
    app: app
  }
};
//const Docs = require('express-api-doc');
filter.seed(filterSeed);
filter.setReplacementMethod('word');
swig.setDefaults({ cache: false });

var defaultHandler = function (req, res) {
  res.json({ message: 'No Request Data Detected.... You have successfully accomplished NOTHING!' });
};

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

var dirAarray = fs.readdirSync(controllerDir).filter(function (file) {
    return fs.statSync(path.join(controllerDir, file)).isDirectory();
});

var getManifest = function () {
  return MANIFEST.info;
};

var addToManifest = function (type, data) {
  MANIFEST.info[type].push(data);
};

var setEndpoint = function (method, uri, fn) {
  var self = this,
    cb = (!fn || typeof(fn) === 'undefined') ? defaultHandler : fn,
    owner = self.ID,
    id = method + ': ' + uri,
    ts = today.getTime();

  switch (method) {
    case 'get':
      app.get(uri, fn);
      break;
    case 'post':
      app.post(uri, fn);
      break;
    case 'put':
      app.put(uri, fn);
      break;
    case 'delete':
      app.delete(uri, fn);
      break;
  }

  addToManifest('endpoints', {
      name: uri,
      version: "1.0.0",
      description: id,
      author: "Steven Jackson",
      license: "GPL-3.0",
      enigma: {
        displayname: uri,
        archetype: 'endpoint',
        classname: method,
        timestamp: ts,
        runtime: '0',
        owner: owner
      }
  });
};

var responseEnvelope = function (context, message, data) {
		return {
			message: message || "OK",
			context: context || "message",
      data: data || []
    };
};

var callManifestModule = function (id) {
  var obj = MANIFEST.modules[id];
  if (!obj || typeof(obj) === 'undefined') {
    throw new Error("No module named " + id + " exists!")
  }
  return obj;
};

// CONSTRUCT THE SERVER CONTROLLER
var CONSTRUCT = function () {
  var self = this,
  pkgInfo = require(rootDir + '/package.json');

  app.engine('html', cons.swig);
	app.set('view engine', 'html');
	app.set('views', frameworkDir + 'views');
	app.set('view cache', false);
	app.use(parser.urlencoded({ extended: true }));
  app.use(parser.json());
  app.use(express.static(frameworkDir + 'public'));
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent to the API
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
  });
  app.get('/', function (req, res) {
    var jsonData = { message: 'API Service OK' };
    res.render('index', { jsonData: jsonData });
  });

  this.settings = pkgInfo.enigma;
  this.ID = "core";

  if (dirAarray) {
    dirAarray.forEach(function (id) {
      if (id !== 'core') {
        var dir = controllerDir + '/' + id;
        if (requiredExists(dir, 'constructor.js')) {
          if (MANIFEST.info.controllers.indexOf(id) == -1) {
            var pkg = getJSONConfig(dir);
            var cfg = pkg.enigma;
            if (cfg && (cfg.enabled && cfg.enabled === 'true')) {
              var controller = require(dir + '/constructor.js').controller;
              MANIFEST.modules[id] = new controller(self, id);
              MANIFEST.modules[id].endpoint = setEndpoint;
              MANIFEST.modules[id].using = callManifestModule;
              MANIFEST.modules[id].register = addToManifest;
              MANIFEST.modules[id].info = getManifest;
              MANIFEST.modules[id].responseEnvelope = responseEnvelope;
              MANIFEST.modules[id].profanity = filter;
              pkg.enigma.timestamp = today.getTime();
              addToManifest('controllers', pkg);
            }
          }
        }
      }
    });
  } else {
    logger.error('Not Found: ' + controllerDir);
  }
};

CONSTRUCT.prototype.endpoint = setEndpoint;

CONSTRUCT.prototype.using = callManifestModule;

CONSTRUCT.prototype.register = addToManifest;

CONSTRUCT.prototype.info = getManifest;

CONSTRUCT.prototype.responseEnvelope = responseEnvelope;

CONSTRUCT.prototype.runningTest = function () {
  logger.debug('ENIGMA is already running');
};

CONSTRUCT.prototype.initialize = function () {
  var self = this,
      saved = MANIFEST.info.controllers;

  Object.keys(saved).forEach(function(key,index) {
    var data = saved[key],
      obj = MANIFEST.modules[data.enigma.classname];
    if (obj && obj.initialize) {
      obj.initialize();
      //logger.debug('Controller [' + data.classname + '] Initialized');
    }
  });

  Object.keys(saved).forEach(function(key,index) {
    var data = saved[key],
      obj = MANIFEST.modules[data.enigma.classname];
    if (obj && obj.finalize) {
      obj.finalize();
      //logger.debug('Controller [' + data.classname + '] Finalized');
    }
  });
  //logger.debug('Initialized Successfully');
  server.on('error', function (e) {
    if (e.code == 'EADDRINUSE') {
      console.log('Address in use, retrying...');
      setTimeout(function () {
        server.close();
        server.listen(PORT, HOST);
      }, 1000);
    }
  });

  // var docs = new Docs(app);
  // docs.generate({
  //   path:     './docs/template.html',
  // });
  // server.listen(process.env.PORT || this.settings.port);
};

MANIFEST.modules.ENIGMA = new CONSTRUCT();

exports.ENIGMA = MANIFEST.modules.ENIGMA;
