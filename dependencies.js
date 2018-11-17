var nodegit = require('nodegit'),
    path = require('path'),
    iis = require('iis'),
    creds = nodegit.Cred.userpassPlaintextNew("nodeclient","P@ssw0rd");

nodegit.Repository.open(path.resolve("./framework/services/.git")).then(function (repo) {
  repo.fetchAll({
    credentials: creds
  }).then(function() {
    repo.mergeBranches("master", "origin/master");
    iis.stopSite('api',function(err,rsp) {
        if (!err) {
           console.log('API stopped');
        }
    });
    iis.startSite('api',function(err,rsp) {
       if (!err) {
         console.log('API restarted');
       }
    });
  });
})
.catch(function (reasonForFailure) {
  var url = "",
    local = "./framework/services",
    cloneOpts = {
      fetchOpts: {
        callbacks: {
          credentials: creds
        }
      }
    };
  nodegit.Clone(url, local, cloneOpts).then(function (repo) {
      console.log("Cloned " + path.basename(url) + " to " + repo.workdir());
      iis.stopSite('api',function(err,rsp) {
          if (!err) {
             console.log('API stopped');
          }
      });
      iis.startSite('api',function(err,rsp) {
         if (!err) {
           console.log('API restarted');
         }
      });
  }).catch(function (err) {
      console.log(err);
  });
});
