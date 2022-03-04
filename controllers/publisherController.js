const async = require('async');
const Game = require('../models/game');
const Publisher = require('../models/publisher');
const GameInstance = require('../models/gameinstance');
const Genre = require('../models/genre');
const { body, validationResult } = require('express-validator');

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
  Publisher.find({}, function(err, publishers){
    if(err){ return next(err); }
    res.render('publisher_list', {title: 'Publishers', publisher_list: publishers})
  });
}

exports.get_publisher = function(req, res, next){
    async.parallel({
      publisher: function(callback){
        Publisher.findById(req.params.id, callback);
      },
      games: function(callback){
        Game.find({publisher: req.params.id}, callback)
    }
  }, function(err, results){
    if(err){ return next(err); }
    res.render('publisher_detail', {title: 'Publisher: ', publisher: results.publisher, games_list: results.games});
  });
}

exports.get_publisher_create = function(req, res, next){
    res.render('publisher_form', {title: 'Create Publisher'});
}

exports.post_publisher_create = [
  function(req,res,next){
    console.log("name: " + req.body.name);
    console.log("location: " + req.body.location);
    next();
  },
  body('name', 'Name cannot be empty!').trim().isLength({min:1}).escape(),
  body('location', 'Location cannot be empty!').trim().isLength({min:1}).escape(),

  (req, res, next) => {
    let errors = validationResult(req);

    let publisher = new Publisher({
      name: req.body.name,
      location: req.body.location
    });

    if(!errors.isEmpty()){
      res.render('publisher_form', {title: 'Create Publisher', publisher: publisher, errors:errors.array()})
    } else{
      //there are no errors, so check if publisher already exists
      Publisher.findOne({name: req.body.name}, function(err, publisher_found){
        if(err){ return next(err); }
        if(publisher_found){
          return res.redirect(publisher_found.url);
        } else{
          //publisher does not exist, so save it to database
          publisher.save(function(err){
            if(err){ return err(next); }
            res.redirect(publisher.url);
          });
        }
      });
    }
  }
];

exports.get_publisher_delete = function(req, res, next){
  async.parallel({
    publisher: function(callback){
      Publisher.findById(req.params.id, callback);
    },
    games: function(callback){
      Game.find({'publisher': req.params.id}, callback);
    }
  }, function(err, results){
    if(err){ return next(err); }
    console.log(results.publisher);
    return res.render('publisher_delete', {title: 'Delete Publisher: ', publisher: results.publisher, games_list: results.games});
  }
)};

exports.post_publisher_delete = function(req, res, next){
  Publisher.findByIdAndRemove(req.body.publisher_id, function(err){
    if(err){ return next(err); }
    console.log('publisher ' + req.body.publisher_id + ' deleted.');
    return res.redirect('/catalog/publishers');
  });
}

exports.get_publisher_update = function(req, res, next){
  res.send('not implemented yet.');
}

exports.post_publisher_update = function(req, res, next){
  res.send('not implemented yet.');
}

module.exports
