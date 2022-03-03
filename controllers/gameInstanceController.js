const GameInstance = require('../models/gameinstance');
const Game = require('../models/game');
const async = require('async');
const { body, validationResult } = require('express-validator');

//gameinstance routes
exports.get_gameinstance_list = function(req, res, next){
  GameInstance.find({})
              .populate('game')
              .exec(function(err, gameinstances){
                if(err){ return next(err); }
                res.render('gameinstance_list', {title: 'Game Instances', gameinstance_list: gameinstances});
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
                return res.render('gameinstance_detail', {title:"Game Instance", gameinstance: result});
              });
}

exports.get_gameinstance_create = function(req, res, next){
  Game.find({}, function(err, games){
      if(err){ return next(err); }
      res.render('gameinstance_form', {title: 'Create Game Instance', game_list: games});
  });
}

exports.post_gameinstance_create = [
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
      due_back: req.body.due_back
    });

    if(!errors.isEmpty()){
      Game.find({}, function(err, games){
          if(err){ return next(err); }
          res.render('gameinstance_form', {title: 'Create Game Instance', game_list: games, gameinstance: gameinstance});
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
