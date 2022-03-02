const Game = require('../models/game');
const Genre = require('../models/genre');
const Publisher = require('../models/publisher');
const Platform = require('../models/platform');

//game routes
exports.get_game_list = function(req, res, next){
  Game.find({})
      .populate('genre')
      .populate('publisher')
      .populate('platform')
      .sort({name: 1})
      .exec(function(err, games){
        if(err){ return next(err); }
        res.render('games_list', {title: 'Game List', games_list: games})
      });
}

exports.get_game = function(req, res, next){
  Game.findById(req.params.id)
    .populate('genre')
    .populate('publisher')
    .populate('platform')
    .exec(function(err, game){
      if(err){ return next(err); }
      return res.send('game_detail', {title: 'Game: ', game:game});
    });
}

exports.get_game_create = function(req, res, next){
  res.send('not implemented yet.');
}

exports.post_game_create = function(req, res, next){
  res.send('not implemented yet.');
}

exports.get_game_delete = function(req, res, next){
  res.send('not implemented yet.');
}

exports.post_game_delete = function(req, res, next){
  res.send('not implemented yet.');
}

exports.get_game_update = function(req, res, next){
  res.send('not implemented yet.');
}

exports.post_game_update = function(req, res, next){
  res.send('not implemented yet.');
}

module.exports
