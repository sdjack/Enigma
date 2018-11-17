/**
* File generated using ENIGMA © 2016 Steven Jackson
*
*/
module.exports = function(socket, client, user) {

  client.on('new message', function(data) {
    var message = data.userPost,
      buffer = message.toUpperCase(),
      askEnigma = (buffer.search("ENIGMA") !== -1);

    data.userPost = socket.profanity.clean(message);
    //console.log("\n\n\n");
    //console.log(data);

    switch (data.messageType) {
      case 'reply':
        socket.db.procs.ReplyToPost(data, function(results) {
          var res = socket.responseEnvelope('new message', 'OK', results);
          socket.io.emit('reply message', res);
        });
        break;
      default:
        if (askEnigma) {
          var autoReply = socket.discuss.autoResponse(data.userPost),
    			model = {};
    			//console.log(autoReply);
    			var today = new Date();
          today.setDate(today.getDate() + 365);
          var dateLabel = today.toISOString();
    			model.USERNAME = 'Enigma';
    			model.DISPLAY_NAME = 'Enigma';
    			model.DISPLAY_INITIALS = 'E';
    			model.STICKER = '0';
    			model.MESSAGE = autoReply.message;
    			model.IMAGE = autoReply.media;
    			model.LATITUDE = data.userLat;
    			model.LONGITUDE = data.userLon;
    			model.LOCATION = data.locationId;
    			model.KARMA = "100";
    			model.REPLY_COUNT = "0";
    			model.SCORE = "0";
    			model.REACTIONS = "{}";
    			model.LAST_UPDATE = dateLabel;
    			model.CREATED_ON = dateLabel;
    			model.SUBDIVISION_ID = "SYSTEM_AUTOREPLY";
    			model.REPLY_ID = "SYSTEM_AUTOREPLY";
    			model.ID = "SYSTEM_AUTOREPLY";
          var modelWrapper = [model];
    			var res2 = socket.responseEnvelope('autoreply', 'OK', modelWrapper);
    			socket.io.emit('autoreply', res2);
        } else {
          socket.queuedBroadcast(data);
        }
        break;
    }
  });

  client.on('reaction', function(data) {
    var res = socket.responseEnvelope('reaction');
    socket.db.procs.SetPostReaction(data, function(results) {
      var res = socket.responseEnvelope('reaction', 'OK', results);
      socket.io.emit('chat reaction', res);
    });
  });

  client.on('create event', function(data) {
    var res = socket.responseEnvelope('create event');
    socket.db.procs.CreateEvent(data, function(results) {
      var res = socket.responseEnvelope('create event', 'OK', results);
      socket.io.emit('event created', res);
    });
  });

  client.on('leave channel', function(data) {
    user.channel = 0;
    var res = socket.responseEnvelope('leave channel', 'A user has left the channel');
    client.emit('channel left', res);
  });

  client.on('join channel', function(data) {
    user.channel = data.channelId;
    var res = socket.responseEnvelope('join channel', 'A user has joined the channel');
    client.emit('channel joined', res);
  });

};
