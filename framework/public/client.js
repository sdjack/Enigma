var io;

(function (exports) {

function _CLIENT(server, port) {
    this._socket = io.connect(server, {'port': port, 'connectTimeout': 3000});
    console.dir(this._socket);
    this._handlers = {'all': []};
    var self = this;
    this._socket.on('message', function(message) {
        self.fire(message.type, message.body);
        self.fire('all', message);
    });
}

_CLIENT.prototype.on = function(event, cb) {
    if (!cb) {
        return;
    }
    if (this._handlers[event] === undefined) {
        this._handlers[event] = [];
    }
    this._handlers[event].push(cb);
};

_CLIENT.prototype.fire = function(event, data) {
    var i, h, l;

    if (this._handlers[event] === undefined){
        return;
    }
    for (i = 0, h = this._handlers[event], l = h.length; i < l; i++) {
        h[i](data); // option: make asynch with setTimeout(0), but needs a wrapper or moving to CS with =>
    }
};

_CLIENT.prototype.register = function(client_id, cb) {
    this.on('registration', cb);
    this._socket.json.send({
        'type': 'register',
        'body': {
            'client_id': client_id
        }
    });
};

_CLIENT.prototype.subscribe = function(channel, password, cb) {
    this.on('subscription', cb);
    this._socket.json.send({
        'type': 'subscribe',
        'body': {
            'channel': channel,
            'password': password
        }
    });
};

_CLIENT.prototype.push = function(password, client_id, channel, type, body) {
    this._socket.json.send({
        'type': 'push',
        'body': {
            'client_id': client_id,
            'password': password,
            'channel': channel,
            'type': type,
            'body': body
          }
    });
};

exports.CommClient = _CLIENT;

}(typeof module === 'object' ? module.exports : window));
