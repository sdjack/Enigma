var MODELS = function() {
};

MODELS.prototype.ChatMessage = function() {
  return {
     "ID":1,
     "POST_ID":"",
     "LOCATION":"",
     "STREAM_INDEX":1,
     "REPLY_ID":"",
     "REPLY_COUNT":0,
     "SCORE":0,
     "LATITUDE":0.00,
     "LONGITUDE":0.00,
     "USERNAME":"ENIGMA",
     "MESSAGE":"",
     "IMAGE":"",
     "REACTIONS":"{}",
     "LAST_UPDATE":"2017-07-31T00:25:49.033"
  };
};

MODELS.prototype.Location = function() {
  return {
     "ID":"",
     "SOCKET_ID":"",
     "LATITUDE":0,
     "LONGITUDE":0,
     "LAT_START":0,
     "LAT_END":0,
     "LONG_START":0,
     "LONG_END":0,
     "SUBDIVISION_ID":0,
     "POPULATION":0,
     "ENGAGEMENT":0,
     "SCORE":0,
     "S1_LAT":0,
     "S1_LONG":0,
     "S2_LAT":0,
     "S2_LONG":0,
     "S3_LAT":0,
     "S3_LONG":0,
     "S4_LAT":0,
     "S4_LONG":0,
     "S1_ENGAGEMENT":0,
     "S1_SCORE":0,
     "S2_ENGAGEMENT":0,
     "S2_SCORE":0,
     "S3_ENGAGEMENT":0,
     "S3_SCORE":0,
     "S4_ENGAGEMENT":0,
     "S4_SCORE":0,
     "ACTIVE":0,
     "CHAT_FEED":"[]"
  };
};

exports.models = MODELS;
