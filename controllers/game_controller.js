const Game = require('../models/game');
const Genre = require('../models/genre');
const Publisher = require('../models/publisher');
const Platform = require('../models/platform');
const async = require('async');
const { body, validationResult } = require('express-validator');

/*game routes
exports.get_game_list = function(req, res, next){
    Game.find({})
        .populate('genre')
        .populate('platform')
        .populate('publisher')
        .exec(function(err, games){
          if(err){ return next(err); }
          if(req.query.sort_by){
            games.sort(sortBy(req.query.sort_by));
          }
          res.render('game_list', {title: 'Games', games_list: games, sort_by:req.query.sort_by, user: req.session.user_id})
        }
    );
}

exports.get_game = function(req, res, next){
  Game.findById(req.params.id)
    .populate('genre')
    .populate('publisher')
    .populate('platform')
    .exec(function(err, game){
      if(err){ return next(err); }
      return res.render('game_detail', {title: 'Game: ', game:game, user: req.session.user_id});
    });
}
*/

exports.get_game = function(req, res, next){
  res.send("Under construction!");
}

exports.post_game = function(req, res, next){
  res.send("Under construction!");
}

module.exports
