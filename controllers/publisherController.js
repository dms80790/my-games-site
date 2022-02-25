const async = require('async');
const Game = require('../models/game');
const Publisher = require('../models/publisher');
const GameInstance = require('../models/gameinstance');
const Genre = require('../models/genre');

//publisher routes
exports.get_home_page = function(req, res, next){
  async.parallel({
      game_count: function(callback){
        Game.countDocuments({}, callback);
      },
      publisher_count: function(callback){
        Publisher.countDocuments({}, callback);
      },
      gameinstance_count: function(callback){
        GameInstance.countDocuments({}, callback);
      },
      gameinstance_available_count: function(callback){
        GameInstance.countDocuments({'status': 'Available'}, callback);
      },
      genre_count: function(callback){
        Genre.countDocuments({}, callback);
      },
    }, function(err, results){
      if(err){ return next(err); }
      res.render('index', {title: 'Game Library Home', data: results, error: err});
    }
  );
}


exports.get_publisher_list = function(req, res, next){
  res.send('not implemented yet.');
}

exports.get_publisher = function(req, res, next){
  res.send('not implemented yet.');
}

exports.get_publisher_create = function(req, res, next){
  res.send('not implemented yet.');
}

exports.post_publisher_create = function(req, res, next){
  res.send('not implemented yet.');
}

exports.get_publisher_delete = function(req, res, next){
  res.send('not implemented yet.');
}

exports.post_publisher_delete = function(req, res, next){
  res.send('not implemented yet.');
}

exports.get_publisher_update = function(req, res, next){
  res.send('not implemented yet.');
}

exports.post_publisher_update = function(req, res, next){
  res.send('not implemented yet.');
}

module.exports
