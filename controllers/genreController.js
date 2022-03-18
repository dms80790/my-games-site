const Genre = require('../models/genre');
const Game = require('../models/game');
const {body, validationResult} = require('express-validator');
const async = require('async');

//genre routes
exports.get_genre_list = function(req, res, next){
  Genre.find({})
       .sort([['name', 'ascending']])
       .exec(function(err, genres){
         if(err){ return next(err); }
         if(req.session.user){
           console.log('you are currently logged in as ' + req.session.user.username);
         }
         res.render('genre_list', {title: 'Genres', genre_list: genres, user: req.session.id});
       });
};

exports.get_genre = function(req, res, next){
  async.parallel({
      genre: function(callback){
        Genre.findById(req.params.id, callback);
      },
      genre_games: function(callback){
        Game.find({genre: req.params.id}, callback);
      }
    },
    function(err, results){
      if(err){ return next(err); }
      if(results.genre == null){
        let err = new Error('Genre not found');
        err.status = 404;
        return next(err);
      }
      res.render('genre_detail', {title: 'Genre Detail', genre: results.genre, genre_games: results.genre_games, user: req.session.id});
    }
  );
}

exports.get_genre_create = function(req, res, next){
  return res.render('genre_form', {title: 'Create Genre', user: req.session.id});
}

exports.post_genre_create = [
  //sanitization of user input
  body('name', 'Must have length at least 1').trim().isLength({min:1}).escape(),

  (req, res, next) => {
    let errors = validationResult(req);

    let genre = new Genre({
      name: req.body.name
    });

    //there are errors in the form submission
    if(!errors.isEmpty()){
      res.render('genre_form', {title:'Create Genre', errors:errors.array(), user: req.session.id})
    } else {
      //make sure the genre doesnt already exist
      Genre.findOne({name: req.body.name}, function(err, found_genre){
        if(err){ return next(err); }
        //genre already exists... redirect to its detail page
        if(found_genre){
          console.log('genre already found, redirecting');
          res.redirect(found_genre.url);
        } else{
          //save the genre item
          genre.save(function(err){
            if(err){ return next(err); }
            console.log('new genre saved');
            res.redirect(genre.url);
          });
        }
      });
    }
  }
];

exports.get_genre_delete = function(req, res, next){
  async.parallel({
      genre: function(callback){
        Genre.findById(req.params.id, callback);
      },
      games: function(callback){
        Game.find({genre: req.params.id}, callback);
      }
    }, function(err, results){
      if(err){ return next(err); }
      return res.render('genre_delete', {title: 'Delete Genre: ', genre: results.genre, games_list: results.games, user: req.session.id});
    }
)};

exports.post_genre_delete = function(req, res, next){
  Genre.findByIdAndRemove(req.body.genre_id, function(err){
    if(err){ return next(err); }
    return res.redirect('/catalog/genres');
  })
}

exports.get_genre_update = function(req, res, next){
  Genre.findById(req.params.id, function(err, genre){
    if(err){ return next(err); }
    if(genre == null){
      let err = new Error("Genre not found");
      err.status = 404;
      return next(err);
    }
    return res.render('genre_form', {title: 'Update Genre: ' + genre.name, genre: genre, user: req.session.id});
  })
}

exports.post_genre_update = [
  //sanitization of user input
  body('name', 'Must have length at least 1').trim().isLength({min:1}).escape(),

  (req, res, next) => {
    let errors = validationResult(req);

    let genre = new Genre({
      name: req.body.name,
      _id: req.params.id
    });

 //there are errors in the form submission
 if(!errors.isEmpty()){
   res.render('genre_form', {title:'Create Genre', genre: genre, errors:errors.array(), user: req.session.id})
 } else {
   //make sure the genre doesnt already exist
   Genre.findOne({name: req.body.name}, function(err, found_genre){
     if(err){ return next(err); }
     //genre already exists... redirect to its detail page
     if(found_genre){
       console.log('genre already found, redirecting');
       res.redirect(found_genre.url);
     } else{
       //save the genre item
       Genre.findByIdAndUpdate(req.params.id, genre, function(err){
         if(err){ return next(err); }
         console.log('genre updated');
         res.redirect(genre.url);
       });
     }
   });
 }
}
];

module.exports
