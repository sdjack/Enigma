/**
* File generated by ENIGMA © 2016 Steven Jackson
*
*/
module.exports = function (service) {

  service.endpoint('get', null, function (req, res) {
    res.json(service.responseEnvelope());
  });

  service.endpoint('post', '/newmessage', function (req, res) {
		service.chatPost(req.body, function (results) {
      res.json(service.responseEnvelope('/newmessage', results));
    });
  });
};
