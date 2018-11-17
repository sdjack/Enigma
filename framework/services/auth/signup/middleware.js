module.exports = function (service) {

  service.endpoint('get', null, function (req, res) {
    res.json(service.responseEnvelope());
  });

  service.endpoint('post', null, function (req, res) {
    var input = {
      userName: req.body.userName,
      passWord: req.body.passWord,
      isGoogle: req.body.isGoogle,
      isFacebook: req.body.isFacebook,
      isTwitter: req.body.isTwitter,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      ipAddress: req.ip
    };
		service.addProfile(input, function (results) {
      res.json(service.responseEnvelope('', results));
    });
  });

  service.endpoint('post', '/token', function (req, res) {
    var input = {
      userName: req.body.userName,
      token: req.body.token,
      isGoogle: req.body.isGoogle,
      isFacebook: req.body.isFacebook,
      isTwitter: req.body.isTwitter,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      ipAddress: req.ip
    };
		service.addTokenProfile(input, function (results) {
      res.json(service.responseEnvelope('/token', results));
    });
  });
};
