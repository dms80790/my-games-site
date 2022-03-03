const Game = require('../models/game');
const Genre = require('../models/genre');
const Publisher = require('../models/publisher');
const Platform = require('../models/platform');
const async = require('async');
const { body, validationResult } = require('express-validator');

//game routes
exports.get_game_list = function(req, res, next){
  Game.find({})
      .populate('genre')
      .populate('publisher')
      .populate('platform')
      .sort({name: 1})
      .exec(function(err, games){
        if(err){ return next(err); }
        res.render('game_list', {title: 'Game List', games_list: games})
      });
}

exports.get_game = function(req, res, next){
  Game.findById(req.params.id)
    .populate('genre')
    .populate('publisher')
    .populate('platform')
    .exec(function(err, game){
      if(err){ return next(err); }
      console.log(game.release_date_formatted);
      return res.render('game_detail', {title: 'Game: ', game:game});
    });
}

exports.get_game_create = function(req, res, next){
  async.parallel({
    publishers: function(callback){
      Publisher.find({}, callback);
    }, platforms: function(callback){
      Platform.find({}, callback);
    }, genres: function(callback){
      Genre.find({}, callback);
    }
  }, function(err, results){
      if(err){ return next(err); }
      res.render('game_form', {title: 'Create Game', publisher_list: results.publishers, platform_list: results.platforms, genre_list: results.genres});
    }
)};

exports.post_game_create = [
  body('title', 'Title required!').trim().isLength({min:1}).escape(),
  body('description', 'Description required!').trim().isLength({min:1}).escape(),
  body('genre.*', 'Genre must be specified!').escape(),
  body('release_date', 'Invalid date!').optional({checkFalsy: true}).isISO8601().toDate(),
  body('publisher', 'Publisher must be specified!').escape(),
  body('platform', 'Platform must be specified!').escape(),

  (req, res, next) => {
    let errors = validationResult(req);

    let game = new Game({
      title: req.body.title,
      description: req.body.description,
      genre: req.body.genre,
      release_date: req.body.release_date,
      publisher: req.body.publisher,
      platform: req.body.platform
    });

    if(!errors.isEmpty()){
      console.log('errors: ' + errors[0].msg);
      async.parallel({
        publishers: function(callback){
          Publisher.find({}, callback);
        }, platforms: function(callback){
          Platform.find({}, callback);
        }, genres: function(callback){
          Genre.find({}, callback);
        }
      }, function(err, results){
          if(err){ return next(err); }
          res.render('game_form', {title: 'Create Game:', game: game, publisher_list: results.publishers, genre_list: results.genres, platform_list: results.platforms});
        }
    );
  } else{
    Game.findOne({title: req.body.title}, function(err, game_found){
      if(err){ return next(err); }
      if(game_found){
        res.redirect(game_found.url);
      } else{
          console.log('saving game...');
          game.save(function(err){
            if(err){ return next(err); }
            return res.redirect(game.url);
          });
      }
    });
  }
}
];

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
