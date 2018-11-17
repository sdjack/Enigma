/**
* File generated using ENIGMA © 2016 Steven Jackson
*
*/

module.exports = function(socket, client, user) {

  client.on('get friend requests', function(data) {
    socket.db.procs.GetFriendRequests(data, function(results) {
      if (results) {
        res.data = results;
      }
      client.emit('friend requests', res);
    });
  });
};
