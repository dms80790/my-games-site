const Platform = require('../models/platform');
const Game = require('../models/game');
const { body, validationResult } = require('express-validator');
const async = require('async');

exports.get_platform_list = function(req, res, next){
  Platform.find({})
          .sort([['name', 'ascending']])
          .exec(function(err, platforms){
            if(err){ return next(err); }
            res.render('platform_list', {title: 'Platforms', platform_list: platforms});
          });
}

exports.get_platform = function(req, res, next){
  async.parallel({
      platform: function(callback){
        Platform.findById(req.params.id, callback);
      },
      games: function(callback){
        Game.find({'platform': req.params.id}, callback)
      }
    }, function(err, results){
          if(err){ return next(err); }
          res.render('platform_detail', {title: 'Platform', platform: results.platform, games_list: results.games});
      }
    );
}

exports.get_platform_create = function(req, res, next){
  //name, company, releaseYear
  res.render('platform_form', {title: 'Create Platform'});
}

exports.post_platform_create = [
  body('name', 'You must enter a name.').trim().isLength({min:1}).escape(),
  body('company', 'You must enter a company.').trim().isLength({min:1}).escape(),
  body('releaseDate', 'Invalid date.').optional({checkFalsy: true}).isISO8601().toDate(),

  (req, res, next) => {
    let errors = validationResult(req);

    let platform = new Platform({
      name: req.body.name,
      company: req.body.company,
      releaseDate: req.body.releaseDate
    });

    if(!errors.isEmpty()){
      return res.send('platform_form', {title: 'Create Platform', platform: platform, errors: errors.array()})
    } else{
        Platform.findOne({'name': req.body.name}, function(err, platform_found){
          if(err){ return next(err); }
          if(platform_found != null){
            return res.redirect(platform_found.url);
          } else{
              platform.save(function(err){
              if(err){ return next(err); }
              return res.redirect(platform.url);
            });
          }
        });
    }
  },
];

exports.get_platform_update = function(req, res, next){
  res.send('not implemented yet');
}

exports.post_platform_update = function(req, res, next){
  res.send('not implemented yet');
}

exports.get_platform_delete = function(req, res, next){
  async.parallel({
    platform: function(callback){
      Platform.findById(req.params.id, callback);
    },
    games: function(callback){
      Game.find({'platform': req.params.id}, callback);
    }
  }, function(err, results){
    if(err){ return next(err); }
    console.log('got here');
    return res.render('platform_delete', {title: 'Delete Platform: ', platform: results.platform, games_list: results.games});
  });
}

exports.post_platform_delete = function(req, res, next){
  Platform.findByIdAndRemove(req.body.platform_id, function(err){
    if(err){ return next(err); }
    return res.redirect('/catalog/platforms');
  })
}
