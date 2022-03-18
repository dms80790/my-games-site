const GameInstance = require('../models/gameinstance');
const Game = require('../models/game');
const async = require('async');
const { body, validationResult } = require('express-validator');

//gameinstance routes
exports.get_gameinstance_list = function(req, res, next){
  async.parallel({
    gameinstance_list: function(callback){
      GameInstance.find({})
        .populate('game')
        .exec(callback)
    }, games: function(callback){
      Game.find().sort({'title': 1}).exec(callback)
    }
  }, function(err, results){
      if(err){ return next(err); }
      if(req.query.filter_by){
        results.gameinstance_list = results.gameinstance_list.filter(instance => {
          return instance.game._id == req.query.filter_by})
      }
      if(req.query.sort_by){
        results.gameinstance_list.sort(sortBy(req.query.sort_by));
      }
      res.render('gameinstance_list', {title: 'Game Instances', gameinstance_list: results.gameinstance_list, game_list: results.games, sort_by: req.query.sort_by, filter_by: req.query.filter_by, user: req.session.id});
  });
}

//game, isbn, due_date, status
exports.get_gameinstance = function(req, res, next){
  GameInstance.findById(req.params.id)
              .populate('game')
              .exec(function(err, result){
                if(err){ return next(err); }
                if(result == null){
                  let err = new Error("Game Instance not found!");
                  err.status = 404;
                  return next(err);
                }
                return res.render('gameinstance_detail', {title:"Game Instance", gameinstance: result, user: req.session.id});
              });
}

exports.get_gameinstance_create = function(req, res, next){
  Game.find({}, function(err, games){
      if(err){ return next(err); }
      res.render('gameinstance_form', {title: 'Create Game Instance', game_list: games, user: req.session.id});
  });
}

exports.post_gameinstance_create = [
  body('game', 'A game must be selected!').escape(),
  body('isbn', 'Invalid ISBN. Must be a number').trim().isNumeric().isLength({min:1}).escape(),
  body('status', 'A status must be selected!').escape(),
  body('due_back').optional({checkFalsy: true}).isISO8601().toDate().withMessage('Date must be in correct format!')
        .custom(value => {if (value < Date.now()){
          }else{
            return true;
          }
        }).withMessage('Due date cannot be before today!'),

  (req, res, next) => {
    let errors = validationResult(req);

    let gameinstance = new GameInstance({
      game: req.body.game,
      isbn: req.body.isbn,
      status: req.body.status,
      dueBack: req.body.due_back
    });

    if(!errors.isEmpty()){
      Game.find({}, function(err, games){
          if(err){ return next(err); }
          res.render('gameinstance_form', {title: 'Create Game Instance', game_list: games, gameinstance: gameinstance, errors:errors.array(), user: req.session.id});
      });
    } else{
        gameinstance.save(function(err){
          if(err){ return next(err); }
          return res.redirect(gameinstance.url);
        });
    }
  }
];

exports.get_gameinstance_delete = function(req, res, next){
  GameInstance.findById(req.params.id, function(err, gameinstance){
    if(err){ return next(err); }
    return res.render('gameinstance_delete', {title: 'Delete Game Instance', gameinstance: gameinstance, user: req.session.id});
  });
};

exports.post_gameinstance_delete = function(req, res, next){
  GameInstance.findByIdAndRemove(req.body.instanceid, function(err){
    if(err){ return next(err); }
    return res.redirect('/catalog/gameinstances');
  })
}

exports.get_gameinstance_update = function(req, res, next){
  async.parallel({
    gameinstance: function(callback){
      GameInstance.findById(req.params.id, callback)
    }, games: function(callback){
      Game.find({}, callback)
    }
  }, function(err, results){
    if(err){ return next(err); }
    return res.render('gameinstance_form', {title: 'Update Game Instance', gameinstance: results.gameinstance, game_list: results.games, user: req.session.id});
  }
)};

exports.post_gameinstance_update = [
  body('game', 'A game must be selected!').escape(),
  body('isbn', 'Invalid ISBN. Must be a number').trim().isNumeric().isLength({min:1}),
  body('status', 'A status must be selected!').escape(),
  body('due_back').optional({checkFalsy: true}).isISO8601().toDate(),

  (req, res, next) => {
    let errors = validationResult(req);

    let gameinstance = new GameInstance({
      game: req.body.game,
      isbn: req.body.isbn,
      status: req.body.status,
      dueBack: req.body.due_back,
      _id: req.params.id
    });

    if(!errors.isEmpty()){
      Game.find({}, function(err, games){
          if(err){ return next(err); }
          res.render('gameinstance_form', {title: 'Create Game Instance', game_list: games, gameinstance: gameinstance, errors:errors.array(), user: req.session.id});
      });
    } else{
        GameInstance.findByIdAndUpdate(req.params.id, gameinstance, function(err){
          if(err){ return next(err); }
          return res.redirect(gameinstance.url);
        });
    }
  }
];

function sortBy(field) {
  return function(a, b) {
    if(field == 'availability'){
      if(a.status > b.status){
        return 1;
      } else{
        return -1;
      }
    } else if(field == 'title'){
        if(a.game.title > b.game.title){
          return 1;
        } else{
          return -1;
        }
    }
  };
}

module.exports
