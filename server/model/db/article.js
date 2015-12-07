// Generated by CoffeeScript 1.9.2
(function() {
  var base_query, getRanged, model, post, selectList;

  model = require('./model');

  post = model.post;

  base_query = '_id title tags createDate ';

  selectList = function(cnt, query) {
    var cur;
    if (query == null) {
      query = {
        type: article
      };
    }
    cur = post.find(query);
    return cur.sort({
      createDate: -1
    }).select(base_query + cnt);
  };

  getRanged = function(start, limit, cnt, callback) {
    return selectList(cnt).skip(start).limit(limit).exec(callback);
  };

  module.exports.getSummary = function(start, limit, callback) {
    return getRanged(start, limit, 'summary break', callback);
  };

  module.exports.getTitles = function(start, limit, callback) {
    return getRanged(start, limit, '', callback);
  };

  module.exports.getTimeLine = function(start, end, callback) {};

}).call(this);
