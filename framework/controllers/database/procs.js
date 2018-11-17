
var STORED_PROCEDURES = function(db) {
  this.db = db;
};

STORED_PROCEDURES.prototype.UserLogin = function(args, callback) {
  var sql = "DECLARE @RC INT ";
  sql += "DECLARE @userName NVARCHAR(100) ";
  sql += "DECLARE @passWord NVARCHAR(max) ";
  sql += "DECLARE @token NVARCHAR(max) ";
  sql += "DECLARE @ipAddress NVARCHAR(50) ";
  sql += "SET @userName = N'" + args.userName + "' ";
  sql += "SET @passWord = N'" + args.passWord + "' ";
  sql += "SET @token = N'" + args.token + "' ";
  sql += "SET @ipAddress = N'" + args.ipAddress + "' ";
  sql += "EXECUTE @RC = [dbo].[UserLogin] @userName, @passWord, @token, @ipAddress ";
  this.db.query(sql, function(results) {
    //console.log(results);
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.UserLogout = function(args, callback) {
  var sql = "DECLARE @RC INT ";
  sql += "DECLARE @userId UNIQUEIDENTIFIER ";
  sql += "DECLARE @userName NVARCHAR(100) ";
  sql += "DECLARE @ipAddress NVARCHAR(50) ";
  sql += "SET @userId = CONVERT(UNIQUEIDENTIFIER, N'" + args.userId + "') ";
  sql += "SET @userName = N'" + args.userName + "' ";
  sql += "SET @ipAddress = N'" + args.ipAddress + "' ";
  sql += "EXECUTE @RC = [dbo].[UserLogout] @userId, @userName, @ipAddress ";
  this.db.query(sql, function(results) {
    //console.log(results);
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.CreateUser = function(args, callback) {
  var sql = "DECLARE @RC int ";
  sql += "DECLARE @firstName NVARCHAR(50) ";
  sql += "DECLARE @lastName NVARCHAR(50) ";
  sql += "DECLARE @email NVARCHAR(100) ";
  sql += "DECLARE @phone NVARCHAR(50) ";
  sql += "DECLARE @userName NVARCHAR(100) ";
  sql += "DECLARE @passWord NVARCHAR(50) ";
  sql += "DECLARE @token NVARCHAR(50) ";
  sql += "DECLARE @isGoogle bit ";
  sql += "DECLARE @isFacebook bit ";
  sql += "DECLARE @isTwitter bit ";
  sql += "DECLARE @ipAddress NVARCHAR(50) ";
  sql += "SET @firstName = N'" + args.firstName + "' ";
  sql += "SET @lastName = N'" + args.lastName + "' ";
  sql += "SET @email = N'" + args.email + "' ";
  sql += "SET @phone = N'" + args.phone + "' ";
  sql += "SET @userName = N'" + args.userName + "' ";
  sql += "SET @passWord = N'" + args.passWord + "' ";
  sql += "SET @token = N'" + args.token + "' ";
  sql += "SET @isGoogle = N'" + args.isGoogle + "' ";
  sql += "SET @isFacebook = N'" + args.isFacebook + "' ";
  sql += "SET @isTwitter = N'" + args.isTwitter + "' ";
  sql += "SET @ipAddress = N'" + args.ipAddress + "' ";
  sql += "EXECUTE @RC = [dbo].[CreateUser] @firstName, @lastName, @email, @phone, @userName, @passWord, @token, @isGoogle, @isFacebook, @isTwitter, @ipAddress ";
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.UpdateUserProfile = function(args, callback) {
  var sql = "DECLARE @RC int ";
  sql += "DECLARE @userId UNIQUEIDENTIFIER ";
  sql += "DECLARE @firstName NVARCHAR(50) ";
  sql += "DECLARE @lastName NVARCHAR(50) ";
  sql += "DECLARE @email NVARCHAR(100) ";
  sql += "DECLARE @phone NVARCHAR(50) ";
  sql += "DECLARE @homeTownId INT ";
  sql += "DECLARE @userStatus NVARCHAR(200) ";
  sql += "SET @userId = CONVERT(UNIQUEIDENTIFIER, N'" + args.userId + "') ";
  sql += "SET @firstName = N'" + args.firstName + "' ";
  sql += "SET @lastName = N'" + args.lastName + "' ";
  sql += "SET @email = N'" + args.email + "' ";
  sql += "SET @phone = N'" + args.phone + "' ";
  sql += "SET @homeTownId = " + args.homeTownId + " ";
  sql += "SET @userStatus = N'" + args.userStatus + "'' ";
  sql += "EXECUTE @RC = [dbo].[UpdateUserProfile] @userId, @firstName, @lastName, @email, @phone, @homeTownId, @userStatus ";
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.UpdateUserAvatar = function(args, callback) {
  var sql = "DECLARE @RC int ";
  sql += "DECLARE @userId UNIQUEIDENTIFIER ";
  sql += "DECLARE @avatarType INT ";
  sql += "DECLARE @avatar NVARCHAR(200) ";
  sql += "DECLARE @avatarColor INT ";
  sql += "SET @userId = CONVERT(UNIQUEIDENTIFIER, N'" + args.userId + "') ";
  sql += "SET @avatarType = " + args.avatarType + " ";
  sql += "SET @avatar = N'" + args.avatar + "' ";
  sql += "SET @avatarColor = " + args.avatarColor + " ";
  sql += "EXECUTE @RC = [dbo].[UpdateUserAvatar] @userId, @avatarType, @avatar, @avatarColor ";
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.UpdateUserHometown = function(args, callback) {
  var sql = "DECLARE @RC int ";
  sql += "DECLARE @userId UNIQUEIDENTIFIER ";
  sql += "DECLARE @homeTownId INT ";
  sql += "SET @userId = CONVERT(UNIQUEIDENTIFIER, N'" + args.userId + "') ";
  sql += "SET @homeTownId = N'" + args.homeTownId + "' ";
  sql += "EXECUTE @RC = [dbo].[UpdateUserHometown] @userId, @homeTownId ";
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.UpdateUserStatus = function(args, callback) {
  var sql = "DECLARE @RC int ";
  sql += "DECLARE @userId UNIQUEIDENTIFIER ";
  sql += "DECLARE @userStatus NVARCHAR(200) ";
  sql += "SET @userId = CONVERT(UNIQUEIDENTIFIER, N'" + args.userId + "') ";
  sql += "SET @userStatus = N'" + args.userStatus + "' ";
  sql += "EXECUTE @RC = [dbo].[UpdateUserStatus] @userId, @userStatus ";
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.UpdateUserLocation = function(args, callback) {
  var sql = "DECLARE @RC int ";
  sql += "DECLARE @userId UNIQUEIDENTIFIER ";
  sql += "DECLARE @userLat float ";
  sql += "DECLARE @userLon float ";
  sql += "SET @userId = CONVERT(UNIQUEIDENTIFIER, N'" + args.userId + "') ";
  sql += "SET @userLat = " + args.userLat + " ";
  sql += "SET @userLon = " + args.userLon + " ";
  sql += "EXECUTE @RC = [dbo].[UpdateUserLocation] @userId, @userLat, @userLon ";
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.GetDataBundle = function(args, callback) {
  var sql = "DECLARE @locationId UNIQUEIDENTIFIER ";
  sql += "SET @locationId = CONVERT(UNIQUEIDENTIFIER, N'" + args.locationId + "') ";
  sql += "SELECT * FROM [dbo].[GetDataBundle] (@locationId) ";
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.GetChatFeed = function(args, callback) {
  var sql = "DECLARE @locationId UNIQUEIDENTIFIER ";
  sql += "SET @locationId = CONVERT(UNIQUEIDENTIFIER, N'" + args.locationId + "') ";
  sql += "SELECT * FROM [dbo].[GetChatFeed] (@locationId) ";
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.GetChatPreview = function(args, callback) {
  var sql = "DECLARE @locationId UNIQUEIDENTIFIER ";
  sql += "SET @locationId = CONVERT(UNIQUEIDENTIFIER, N'" + args.locationId + "') ";
  sql += "SELECT * FROM [dbo].[GetChatPreview] (@locationId) ";
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.PostToChat = function(args, callback) {
  var sql = "DECLARE @RC INT ";
  sql += "DECLARE @userId UNIQUEIDENTIFIER ";
  sql += "DECLARE @locationId UNIQUEIDENTIFIER ";
  sql += "DECLARE @eventId UNIQUEIDENTIFIER ";
  sql += "DECLARE @userName NVARCHAR(100) ";
  sql += "DECLARE @userPost NVARCHAR(500) ";
  sql += "DECLARE @userMedia NVARCHAR(MAX) ";
  sql += "DECLARE @isSticker BIT ";
  sql += "DECLARE @userLat FLOAT ";
  sql += "DECLARE @userLon FLOAT ";
  sql += "SET @userId = CONVERT(UNIQUEIDENTIFIER, N'" + args.userId + "') ";
  sql += "SET @locationId = CONVERT(UNIQUEIDENTIFIER, N'" + args.locationId + "') ";
  sql += "SET @eventId = CONVERT(UNIQUEIDENTIFIER, N'" + args.eventId + "') ";
  sql += "SET @userName = N'" + args.userName + "' ";
  sql += "SET @userPost = N'" + args.userPost + "' ";
  sql += "SET @userMedia = N'" + args.userMedia + "' ";
  sql += "SET @isSticker = " + ((args.isSticker)?1:0) + " ";
  sql += "SET @userLat = " + args.userLat + " ";
  sql += "SET @userLon = " + args.userLon + " ";
  sql += "EXECUTE @RC = [dbo].[PostToChat] @userId, @locationId, @eventId, @userName, @userPost, @userMedia, @isSticker, @userLat, @userLon ";
  //console.log(sql);
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.BulkPostToChat = function(sql, callback) {
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.ReplyToPost = function(args, callback) {
  var sql = "DECLARE @RC INT ";
  sql += "DECLARE @replyId UNIQUEIDENTIFIER ";
  sql += "DECLARE @userId UNIQUEIDENTIFIER ";
  sql += "DECLARE @locationId UNIQUEIDENTIFIER ";
  sql += "DECLARE @eventId UNIQUEIDENTIFIER ";
  sql += "DECLARE @userName NVARCHAR(100) ";
  sql += "DECLARE @userPost NVARCHAR(500) ";
  sql += "DECLARE @userMedia NVARCHAR(MAX) ";
  sql += "DECLARE @isSticker BIT ";
  sql += "DECLARE @userLat FLOAT ";
  sql += "DECLARE @userLon FLOAT ";
  sql += "SET @replyId = CONVERT(UNIQUEIDENTIFIER, N'" + args.replyId + "') ";
  sql += "SET @userId = CONVERT(UNIQUEIDENTIFIER, N'" + args.userId + "') ";
  sql += "SET @locationId = CONVERT(UNIQUEIDENTIFIER, N'" + args.locationId + "') ";
  sql += "SET @eventId = CONVERT(UNIQUEIDENTIFIER, N'" + args.eventId + "') ";
  sql += "SET @userName = N'" + args.userName + "' ";
  sql += "SET @userPost = N'" + args.userPost + "' ";
  sql += "SET @userMedia = N'" + args.userMedia + "' ";
  sql += "SET @isSticker = " + ((args.isSticker)?1:0) + " ";
  sql += "SET @userLat = " + args.userLat + " ";
  sql += "SET @userLon = " + args.userLon + " ";
  sql += "EXECUTE @RC = [dbo].[ReplyToPost] @replyId, @userId, @locationId, @eventId, @userName, @userPost, @userMedia, @isSticker, @userLat, @userLon ";
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.SetPostReaction = function(args, callback) {
  var sql = "DECLARE @RC int ";
  sql += "DECLARE @postId UNIQUEIDENTIFIER ";
  sql += "DECLARE @locationId UNIQUEIDENTIFIER ";
  sql += "DECLARE @userName NVARCHAR(100) ";
  sql += "DECLARE @reactionScore int ";
  sql += "SET @postId = CONVERT(UNIQUEIDENTIFIER, N'" + args.postId + "') ";
  sql += "SET @locationId = CONVERT(UNIQUEIDENTIFIER, N'" + args.locationId + "') ";
  sql += "SET @userName = N'" + args.userName + "' ";
  sql += "SET @reactionScore = " + args.reactionScore + " ";
  sql += "EXECUTE @RC = [dbo].[SetPostReaction] @postId, @locationId, @userName, @reactionScore ";
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.GetAreaNodes = function(args, callback) {
  var sql = "DECLARE @locationId UNIQUEIDENTIFIER ";
  sql += "SET @locationId = CONVERT(UNIQUEIDENTIFIER, N'" + args.locationId + "') ";
  sql += "SELECT * FROM [dbo].[GetAreaNodes] (@locationId) ";
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.GetSubDivisionNodes = function(args, callback) {
  var sql = "DECLARE @subDivisionId UNIQUEIDENTIFIER ";
  sql += "SET @subDivisionId = CONVERT(UNIQUEIDENTIFIER, N'" + args.subDivisionId + "') ";
  sql += "SELECT * FROM [dbo].[GetSubDivisionNodes] (@subDivisionId) ";
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.GetHeatMapData = function(args, callback) {
  var sql = "DECLARE @RC INT ";
  sql += "DECLARE @sdId UNIQUEIDENTIFIER ";
  sql += "SET @sdId = CONVERT(UNIQUEIDENTIFIER, N'" + args.sdId + "') ";
  sql += "EXECUTE @RC = [dbo].[GetHeatMapData] @sdId ";
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.GetGeoJSON = function(args, callback) {
  var sql = "DECLARE @RC INT ";
  sql += "DECLARE @userId UNIQUEIDENTIFIER ";
  sql += "SET @userId = CONVERT(UNIQUEIDENTIFIER, N'" + args.userId + "') ";
  sql += "EXECUTE @RC = [dbo].[GetGeoJsonLayer] @userId ";
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.GetSocketNames = function(callback) {
  var sql = "SELECT [SOCKET_ID] FROM [Constants].[GeoFenceSubDivision] ";
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.GetAnonymousLocation = function(args, callback) {
  var sql = "DECLARE @locationId UNIQUEIDENTIFIER ";
  sql += "DECLARE @lat FLOAT ";
  sql += "DECLARE @long FLOAT ";
  sql += "SET @lat = " + args.userLat + " ";
  sql += "SET @long = " + args.userLon + " ";
  sql += "EXECUTE [dbo].[GetAnonymousLocation] @lat, @long ";
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.GetEventList = function(args, callback) {
  var sql = "DECLARE @locationId UNIQUEIDENTIFIER ";
  sql += "SET @locationId = CONVERT(UNIQUEIDENTIFIER, N'" + args.locationId + "') ";
  sql += "SELECT * FROM [dbo].[GetEventList] (@locationId) ";
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.GetEventPreview = function(args, callback) {
  var sql = "DECLARE @locationId UNIQUEIDENTIFIER ";
  sql += "DECLARE @eventId UNIQUEIDENTIFIER ";
  sql += "SET @locationId = CONVERT(UNIQUEIDENTIFIER, N'" + args.locationId + "') ";
  sql += "SET @eventId = CONVERT(UNIQUEIDENTIFIER, N'" + args.eventId + "') ";
  sql += "SELECT * FROM [dbo].[GetEventPreview] (@locationId, @eventId) ";
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.CreateEvent = function(args, callback) {
  var sql = "DECLARE @RC INT ";
  sql += "DECLARE @userId UNIQUEIDENTIFIER ";
  sql += "DECLARE @locationId UNIQUEIDENTIFIER ";
  sql += "DECLARE @eventDesc NVARCHAR(50) ";
  sql += "DECLARE @eventCat INT ";
  sql += "DECLARE @userLat FLOAT ";
  sql += "DECLARE @userLon FLOAT ";
  sql += "SET @userId = CONVERT(UNIQUEIDENTIFIER, N'" + args.userId + "') ";
  sql += "SET @locationId = CONVERT(UNIQUEIDENTIFIER, N'" + args.locationId + "') ";
  sql += "SET @eventDesc = N'" + args.eventDesc + "' ";
  sql += "SET @eventCat = " + args.eventCat + " ";
  sql += "SET @userLat = " + args.userLat + " ";
  sql += "SET @userLon = " + args.userLon + " ";
  sql += "EXECUTE @RC = [dbo].[CreateEvent] @userId, @locationId, @eventDesc, @eventCat, @userLat, @userLon ";
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.GetFriendRequests = function(args, callback) {
  var sql = "DECLARE @userId UNIQUEIDENTIFIER ";
  sql += "SET @userId = CONVERT(UNIQUEIDENTIFIER, N'" + args.userId + "') ";
  sql += "SELECT * FROM [dbo].[GetFriendRequests] (@userId) ";
  this.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.SendFriendRequest = function(args, callback) {
  var self = this,
  sql = "DECLARE @RC int ";
  sql += "DECLARE @userId UNIQUEIDENTIFIER ";
  sql += "DECLARE @toUser NVARCHAR(100) ";
  sql += "SET @userId = CONVERT(UNIQUEIDENTIFIER, N'" + args.userId + "') ";
  sql += "SET @toUser = N'" + args.toUser + "' ";
  sql += "EXECUTE @RC = [dbo].[SendFriendRequest] @userId, @toUser ";
  self.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined' || typeof (results.data[0]) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

STORED_PROCEDURES.prototype.UpdateFriendRequest = function(args, callback) {
  var self = this,
  sql = "DECLARE @RC int ";
  sql += "DECLARE @userId UNIQUEIDENTIFIER ";
  sql += "DECLARE @friendId UNIQUEIDENTIFIER ";
  sql += "DECLARE @responseState INT ";
  sql += "SET @userId = CONVERT(UNIQUEIDENTIFIER, N'" + args.userId + "') ";
  sql += "SET @friendId = CONVERT(UNIQUEIDENTIFIER, N'" + args.friendId + "') ";
  sql += "SET @responseState = " + args.responseState + " ";
  sql += "EXECUTE @RC = [dbo].[UpdateFriendRequest] @userId, @friendId, @responseState ";
  self.db.query(sql, function(results) {
    if (typeof (callback) !== 'undefined') {
      if (typeof (results.data) === 'undefined' || typeof (results.data[0]) === 'undefined') {
        callback(results);
      } else {
        callback(results.data);
      }
    }
  });
};

exports.procs = STORED_PROCEDURES;
