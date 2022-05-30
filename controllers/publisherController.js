const async = require('async');
const Game = require('../models/game');
const Publisher = require('../models/publisher');
const Genre = require('../models/genre');
const { body, validationResult } = require('express-validator');
const api_callers = require('./api_callers');
const CoverArt = require('../models/coverart');

//publisher routes
exports.get_home_page = function(req, res, next){
  api_callers.load_games();
  /*CoverArt.findOne({}, function(err, cover){
    if(err){ return next(err); }
    console.log('found one' + cover.uri);
    return res.render('index', {cover1: 'https://images.igdb.com/igdb/image/upload/t_cover_big/' + cover.uri + '.png'});
  });
  */
 res.render('index');
}


//////*****************************************************API CALLS IN THIS FUNCTION FOR TESTING */
exports.get_publisher_list = function(req, res, next){
  Publisher.find({})
        .sort({'name': 1})
        .exec(function(err, publishers){
          if(err){ return next(err); }
          //api_callers.load_games();
          return res.render('publisher_list', {title: 'Publishers', publisher_list: publishers, user: req.session.user_id})
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
    return res.render('publisher_detail', {title: 'Publisher: ', publisher: results.publisher, games_list: results.games, user: req.session.user_id});
  });
}

exports.get_publisher_create = function(req, res, next){
    return res.render('publisher_form', {title: 'Create Publisher', user: req.session.user_id});
}

exports.post_publisher_create = [
  body('name', 'Name cannot be empty!').trim().isLength({min:1}).escape(),
  body('location', 'Location cannot be empty!').trim().isLength({min:1}).escape(),

  (req, res, next) => {
    let errors = validationResult(req);

    let publisher = new Publisher({
      name: req.body.name,
      location: req.body.location
    });

    if(!errors.isEmpty()){
      return res.render('publisher_form', {title: 'Create Publisher', publisher: publisher, errors:errors.array(), user: req.session.user_id})
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
            return res.redirect(publisher.url);
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
    return res.render('publisher_delete', {title: 'Delete Publisher: ', publisher: results.publisher, games_list: results.games, user: req.session.user_id});
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
  Publisher.findById(req.params.id, function(err, publisher){
    if(err){ return next(err); }
    return res.render('publisher_form', {title: 'Update Publisher: ' + publisher.name, publisher: publisher, user: req.session.user_id});
  });
}

exports.post_publisher_update = [
  body('name', 'Name cannot be empty!').trim().isLength({min:1}).escape(),
  body('location', 'Location cannot be empty!').trim().isLength({min:1}).escape(),

  (req, res, next) => {
    let errors = validationResult(req);

    let publisher = new Publisher({
      name: req.body.name,
      location: req.body.location,
      _id: req.params.id
    });

    if(!errors.isEmpty()){
      return res.render('publisher_form', {title: 'Create Publisher', publisher: publisher, errors:errors.array(), user: req.session.user_id})
    } else{
        Publisher.findByIdAndUpdate(req.params.id, publisher, function(err){
            if(err){ return err(next); }
            return res.redirect(publisher.url);
        });
      }
  }
];

module.exports
