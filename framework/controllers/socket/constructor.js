var CONFIG_SETTINGS = require('./config.js').settings,
fs = require('fs'),
path = require('path'),
frameworkDir = path.normalize(__dirname + '/../../'),
emitterDir = frameworkDir + 'sockets',
logging = require(frameworkDir + '/helpers/logging.js'),
logger = logging.createNewLogger('socket'),
discuss = require(frameworkDir + '/helpers/discuss.js'),
today = new Date(),
DEFAULT_ROOM = 0,
emitterArray,
MASTER_SOCKET,
EMIT_BUFFER = {},
EMIT_QUEUE = [];

/**
* LOCAL HELPER FUNCTIONS
*/
var asyncFunc = function (callback) {
	setTimeout(callback, 1);
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

/**
* CLIENT OBJECT CONSTRUCTOR
*/
var CLIENT = function (client, userId, address) {
    this.source = client;
	  this.userId = userId;
		this.userIP = address;
    this.channel = DEFAULT_ROOM;
};
/**
* CLIENTLIST OBJECT CONSTRUCTOR
*/
var USERS = function () {
    this.registry = {};
};

USERS.prototype.addUser = function(client, userId, address) {
  this.registry[userId] = new CLIENT(client, userId, address);
  return this.registry[userId];
}

USERS.prototype.getUser = function(userId) {
  return this.registry[userId];
}

USERS.prototype.removeUser = function(client) {
  var self = this, removalKey;
  Object.keys(self.registry).forEach(function(key,index) {
    var data = self.registry[key];
    if (data && data.source && data.source.id && (data.source.id == client.id)) {
      removalKey = key;
    }
  });
  if (removalKey) {
    self.registry[removalKey] = null;
  }
}

USERS.prototype.getClientByUser = function(userId) {
  var self = this,
      data = self.registry[userId];
  if (data && data.source) {
    return data.source;
  }
  return false;
}

USERS.prototype.getUserByClient = function(client) {
  var self = this;
  Object.keys(self.registry).forEach(function(key,index) {
    var data = self.registry[key];
    if (data && data.source && data.source.id && (data.source.id == client.id)) {
      return data;
    }
  });
  return false;
}
/**
* NAMESPACE OBJECT CONSTRUCTOR
*/
var NAMESPACES = {};
var NAMESPACE = function (data) {
    this.id = data.ID;
    this.name = data.SOCKET_ID;
    this.endpoint = '/' + data.SOCKET_ID;
};

var initializeSocket = function (socket) {
  if (!socket || !socket.io || typeof(socket.io) === 'undefined') {
    return;
  }
  socket.users = new USERS();
  socket.io.on('connection', function(client) {
    //console.log(client);
    var address = client.handshake.address,
				userId = client.handshake.query['userId'],
        user = socket.users.addUser(client, userId, address);

		socket.db.query("UPDATE [dbo].[Authentication] SET [ONLINE] = 1 WHERE ID = CONVERT(UNIQUEIDENTIFIER, N'" + userId + "') ");

    // var isTesting = client.handshake.query['testing'];
    // if (isTesting) {
    //     var input = {
    //       "userId": client.handshake.query['userId'],
    //       "masterId": client.handshake.query['masterId'],
    //       "userName": client.handshake.query['userName'],
    //       "userLat": client.handshake.query['userLat'],
    //       "userLon": client.handshake.query['userLon'],
    //       "userPost": client.handshake.query['userPost'],
    //       "userMedia": client.handshake.query['userMedia'],
    //       "messageType": client.handshake.query['messageType']
    //     };
    //     if (typeof(input.userPost) !== 'undefined') {
    //       MASTER_SOCKET.queuedBroadcast(input);
    //     }
    // }

    if (emitterArray) {
      emitterArray.forEach(function (groupName) {
        if (groupName !== '.git') {
          var groupDir = emitterDir + '/' + groupName;
          if (requiredExists(groupDir, 'constructor.js')) {
            require(groupDir + '/constructor.js')(socket, client, user);
          }
        }
      });
    }

    client.on('disconnect', function () {
      var res = socket.responseEnvelope('disconnect', 'A user has disconnected');
			socket.db.query("UPDATE [dbo].[Authentication] SET [ONLINE] = 0 WHERE ID = CONVERT(UNIQUEIDENTIFIER, N'" + userId + "') ");
      socket.users.removeUser(client);
      socket.io.emit('user disconnect', res);
    });
  });
};
/**
* CONSTRUCT THE CONTROLLER MODULE
*/
var CONSTRUCT = function (id) {
    this.settings = CONFIG_SETTINGS;
    this.id = id;
    this.namespaces = {};
};

CONSTRUCT.prototype = require('events');
/**
* RESPONSE OBJECT CONSTRUCTOR
*/
CONSTRUCT.prototype.processQueue = function() {
  var sql = "";
  var limit = (EMIT_QUEUE.length > 2000) ? 2000 : EMIT_QUEUE.length;

  //console.log("\n\n");
  //console.log("EMIT_QUEUE CURRENT SIZE ========> " + EMIT_QUEUE.length);

  for (var i = 0; i < limit; i++) {
    var fn = EMIT_QUEUE.shift();
    if (typeof(fn) === 'function') {
      fn();
    }
  }
};

CONSTRUCT.prototype.updateQueueBuffer = function() {
  if (EMIT_QUEUE.length < 2001) {
      for (id in EMIT_BUFFER) {
          if (typeof(EMIT_BUFFER[id]) !== 'undefined' && typeof(EMIT_BUFFER[id].backlog) !== 'undefined' && EMIT_BUFFER[id].backlog.length > 0) {
              var buffer = EMIT_BUFFER[id].backlog.shift();
              for (var i = 0; i < 5; i++) {
                EMIT_QUEUE.push(buffer[i]);
              }
          }
      }
  }
};

CONSTRUCT.prototype.queuedBroadcast = function(data) {
  var self = this;
	if (EMIT_QUEUE.length === 0) {
		self.db.procs.PostToChat(data, function(results) {
			if (results.error) {
        console.log("\n\n");
        console.log("CHAT POST ERROR ==== " + results.response);
      } else {
        // console.log("\n\n");
        // console.log("CHAT POST COMPLETED");
        // console.log(results);
				var res = self.responseEnvelope('new message', 'OK', results);
				self.io.emit('public message', res);
			}
		});
	} else {
		if (typeof(EMIT_BUFFER[self.id]) === 'undefined') {
	    EMIT_BUFFER[self.id] = {
	      current: [],
	      backlog: []
	    };
	  }
	  if (EMIT_BUFFER[self.id].current.length < 5) {
	    var sql = "INSERT INTO [dbo].[ChatFeed] (MASTER_ID, USERNAME, MESSAGE, IMAGE, LATITUDE, LONGITUDE) VALUES (";
	    sql += "CONVERT(UNIQUEIDENTIFIER, N'" + data.locationId + "'), ";
	    sql += "N'" + data.userName + "', ";
	    sql += "N'" + data.userPost + "', ";
	    sql += "N'" + data.userMedia + "', ";
	    sql += data.userLat + ", ";
	    sql += data.userLon + ") ";
	    EMIT_BUFFER[self.id].current.push(function () {
	      self.db.query(sql, function(results) {
	        if (results.error) {
	          console.log("\n\n");
	          console.log("EMIT_QUEUE ERROR ==== " + results.response);
	        } else {
	          // console.log("\n\n");
	          // console.log("EMIT_QUEUE INSERT COMPLETED");
           //  console.log(results);
	          var res = self.responseEnvelope('new message', 'OK', results);
	          self.io.emit('public message', res);
	        }
	      });
	    });
	  } else {
	    var t = [];
	    for (var i = 0; i < 5; i++) {
	      t.push(EMIT_BUFFER[self.id].current.shift());
	    }
	    EMIT_BUFFER[self.id].backlog.push(t);
	  }
	}
};

CONSTRUCT.prototype.notifyNamespace = function (masterId, event, data) {
	var client = this.users.getClientByUser(userId);
  if (client && client.id) {
    var res = {
  		context: event,
  		message: "OK",
  		data: data
  	};
  	client.emit(event, res);
  }
};

CONSTRUCT.prototype.notifyUser = function (userId, event, data) {
	var client = this.users.getClientByUser(userId);
  if (client && client.id) {
    var res = {
  		context: event,
  		message: "OK",
  		data: data
  	};
  	client.emit(event, res);
  }
};

CONSTRUCT.prototype.notifyAll = function (event, data) {
	var res = {
		context: event,
		message: "OK",
		data: data
	};
	this.io.sockets.emit(event, res);
};

CONSTRUCT.prototype.updateNamespaces = function() {
  this.db.procs.GetSocketNames(function(results) {
		results.forEach(function (rowData) {
			MASTER_SOCKET.addNamespace(rowData);
		});
	});
};

CONSTRUCT.prototype.addNamespace = function(data) {
  if (data.SOCKET_ID && typeof(data.SOCKET_ID) !== 'undefined' && typeof(NAMESPACES[data.SOCKET_ID]) === 'undefined') {
    var ns = new NAMESPACE(data);
    ns.db = this.db;
    ns.cypher = this.cypher;
    ns.responseEnvelope = this.responseEnvelope;
    ns.notifyNamespace = this.notifyNamespace;
    ns.notifyUser = this.notifyUser;
    ns.notifyAll = this.notifyAll;
    ns.queuedBroadcast = this.queuedBroadcast;
		ns.updateNamespaces = this.updateNamespaces;
    ns.io = this.io.of(ns.endpoint);
    initializeSocket(ns);
    NAMESPACES[data.SOCKET_ID] = ns;
    this.namespaces[data.SOCKET_ID] = NAMESPACES[data.SOCKET_ID];
  }
};

CONSTRUCT.prototype.initialize = function () {
    var server = this.using('server');

    MASTER_SOCKET = this;

    emitterArray = getDirectories(emitterDir);

		this.io = require('socket.io').listen(server);
    this.db = this.using('database');
		this.cypher = this.using('cypher');
		this.discuss = discuss;

    //this.updateNamespaces();
    initializeSocket(this);
};

exports.controller = CONSTRUCT;
