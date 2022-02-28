const GameInstance = require('../models/gameinstance');

//gameinstance routes
exports.get_gameinstance_list = function(req, res, next){
  GameInstance.find({}, function(err, gameinstances){
    if(err){ return next(err); }
    res.render('gameinstance_list', {title: 'Game Instances', gameinstance_list: gameinstances});
  });
}

exports.get_gameinstance = function(req, res, next){
  res.send('not implemented yet.');
}

exports.get_gameinstance_create = function(req, res, next){
  res.send('not implemented yet.');
}

exports.post_gameinstance_create = function(req, res, next){
  res.send('not implemented yet.');
}

exports.get_gameinstance_delete = function(req, res, next){
  res.send('not implemented yet.');
}

exports.post_gameinstance_delete = function(req, res, next){
  res.send('not implemented yet.');
}

exports.get_gameinstance_update = function(req, res, next){
  res.send('not implemented yet.');
}

exports.post_gameinstance_update = function(req, res, next){
  res.send('not implemented yet.');
}

module.exports
