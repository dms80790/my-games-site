const Game = require('../models/game');
const Genre = require('../models/genre');
const Publisher = require('../models/publisher');
const Platform = require('../models/platform');
const GameInstance = require('../models/gameinstance')
const async = require('async');
const { body, validationResult } = require('express-validator');

//game routes
exports.get_game_list = function(req, res, next){
  Game.find({})
      .populate('genre')
      .populate('publisher')
      .populate('platform')
      .sort([['title', 'ascending']])
      .exec(function(err, games){
        if(err){ return next(err); }
        res.render('game_list', {title: 'Games', games_list: games})
      });
}

exports.post_game_list = function(req, res, next){
  let sort_option = req.body.sort_by;

  switch(sort_option){
    case 'alphabet':
      console.log('sorted by alphabet')
      sort_option = 'title';
      break;
    case 'platform':
      console.log('sorted by platform')
      sort_option= 'platform.name';
      break;
    case 'publisher':
      console.log('sorted by publisher')
      sort_option= 'publisher.name';
  }
  Game.find({})
      .populate('genre')
      .populate('publisher')
      .populate('platform')
      .sort([[sort_option, 'ascending']])
      .exec(function(err, games){
        if(err){ return next(err); }
        res.render('game_list', {title: 'Games', games_list: games, sort_option: sort_option})
      });
}

exports.get_game = function(req, res, next){
  Game.findById(req.params.id)
    .populate('genre')
    .populate('publisher')
    .populate('platform')
    .exec(function(err, game){
      if(err){ return next(err); }
      console.log(game.platform);
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
  body('platform.*', 'Platforms must be specified!').escape(),

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
  async.parallel({
    instances: function(callback){
      GameInstance.find({'game': req.params.id}).populate('game').exec(callback);
    },
    game: function(callback){
      Game.findById(req.params.id, callback);
    }
  }, function(err, results){
    if(err){ return next(err); }
    if(results.game == null){
      res.redirect('/catalog/games');
    }
    console.log(results.game);
    res.render('game_delete', {title:'Delete Game: ', game: results.game, gameinstance_list: results.instances})
    }
  );
}

exports.post_game_delete = function(req, res, next){
  Game.findByIdAndRemove(req.body.game_id, function(err){
    if(err){ return next(err);}
    console.log('game ' + req.body.game_id + ' deleted');
    res.redirect('/catalog/games');
  })
}

exports.get_game_update = function(req, res, next){
  async.parallel({
    publishers: function(callback){
      Publisher.find({}, callback);
    }, platforms: function(callback){
      Platform.find({}, callback);
    }, genres: function(callback){
      Genre.find({}, callback);
    }, game: function(callback){
      Game.findById(req.params.id, callback)
    }
  }, function(err, results){
      if(err){ return next(err); }
      res.render('game_form', {title: 'Create Game', publisher_list: results.publishers, platform_list: results.platforms, genre_list: results.genres, game: results.game});
    }
)};

exports.post_game_update = [
  body('title', 'Title required!').trim().isLength({min:1}).escape(),
  body('description', 'Description required!').trim().isLength({min:1}).escape(),
  body('genre.*', 'Genre must be specified!').escape(),
  body('release_date', 'Invalid date!').optional({checkFalsy: true}).isISO8601().toDate(),
  body('publisher', 'Publisher must be specified!').escape(),
  body('platform.*', 'Platform must be specified!').escape(),

  (req, res, next) => {
    let errors = validationResult(req);

    let game = new Game({
      title: req.body.title,
      description: req.body.description,
      genre: req.body.genre,
      release_date: req.body.release_date,
      publisher: req.body.publisher,
      platform: req.body.platform,
      _id: req.params.id
    });

    if(!errors.isEmpty()){
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
      Game.findByIdAndUpdate(req.params.id, game, function(err){
        if(err){ return next(err); }
        return res.redirect(game.url);
      });
    }
  }
];

module.exports
