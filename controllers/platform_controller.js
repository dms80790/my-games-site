const Platform = require('../models/platform');
const Game = require('../models/game');
const { body, validationResult } = require('express-validator');
const async = require('async');

/*exports.get_platform_list = function(req, res, next){
  Platform.find({})
          .sort([['company', 'ascending'], ['name', 'ascending']])
          .exec(function(err, platforms){
            if(err){ return next(err); }
            res.render('platform_list', {title: 'Platforms', platform_list: platforms, user: req.session.user_id});
          });
}*/

//note: currently uses a random number to skip a random number of games in the result
function get_platform_home(platformNum, platformName, req, res, next){
  let rand = Math.floor(Math.random() * 50);
  console.log(rand);
  Game.find({'platforms': platformNum})
      .skip(rand)
      .limit(4)
      .exec(function(err, games){
        if(err){ return next(err); }
        if(games){
        return res.render('platform_home', {title: platformName, games_list: games});
        }
        else{ return res.send('No games loaded'); }
      });
}

exports.get_playstation_home = function(req, res, next){
  Game.find({'platforms': 48})
      .limit(4)
      .exec(function(err, games){
        if(err){ return next(err); }
        if(games){
        return res.render('platform_home', {title: games[0].platforms.name, games_list: games});
        }
        else{ return res.send('No games loaded'); }
      });
}

exports.get_ps1_home = function(req, res, next){
  get_platform_home(7, 'PlayStation 1', req, res, next);
}

exports.get_ps2_home = function(req, res, next){
  get_platform_home(8, 'PlayStation 2', req, res, next);
}

exports.get_ps3_home = function(req, res, next){
  get_platform_home(9, 'PlayStation 3', req, res, next);
}

exports.get_ps4_home = function(req, res, next){
  get_platform_home(48, 'PlayStation 4', req, res, next);
}

exports.get_ps5_home = function(req, res, next){
  get_platform_home(167, 'PlayStation 5', req, res, next);
}

exports.get_xbox_home = function(req, res, next){
  get_platform_home(11, 'XBOX', req, res, next);
}

exports.get_xboxxbox_home = function(req, res, next){
  get_platform_home(11, 'XBOX', req, res, next);
}

exports.get_xbox360_home = function(req, res, next){
  get_platform_home(12, 'XBOX 360', req, res, next);
}

exports.get_xboxone_home = function(req, res, next){
  get_platform_home(49, 'XBOX One', req, res, next);
}

exports.get_xboxseries_home = function(req, res, next){
  get_platform_home(169, 'XBOX Series X|S', req, res, next);
}

exports.get_nintendo_home = function(req, res, next){
  get_platform_home(18, 'Nintendo', req, res, next);
}

exports.get_nes_home = function(req, res, next){
  get_platform_home(18, 'Nintendo Entertainment System', req, res, next);
}

exports.get_snes_home = function(req, res, next){
  get_platform_home(19, 'Super Nintendo Entertainment System', req, res, next);
}

exports.get_n64_home = function(req, res, next){
  get_platform_home(4, 'Nintendo 64', req, res, next);
}

exports.get_gamecube_home = function(req, res, next){
  get_platform_home(21, 'Nintendo GameCube', req, res, next);
}

exports.get_wii_home = function(req, res, next){
  get_platform_home(5, 'Nintendo Wii', req, res, next);
}

exports.get_wiiu_home = function(req, res, next){
  get_platform_home(41, 'Nintendo Wii U', req, res, next);
}

exports.get_switch_home = function(req, res, next){
  get_platform_home(130, 'Nintendo Switch', req, res, next);
}

exports.get_pc_home = function(req, res, next){
  get_platform_home(6, 'PC', req, res, next);
}

module.exports;