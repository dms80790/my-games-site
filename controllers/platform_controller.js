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

exports.get_playstation_home = function(req, res, next){
  res.send('under construction!');
}

exports.get_ps1_home = function(req, res, next){
  res.send('under construction!');
}

exports.get_ps2_home = function(req, res, next){
  res.send('under construction!');
}

exports.get_ps3_home = function(req, res, next){
  res.send('under construction!');
}

exports.get_ps4_home = function(req, res, next){
  res.send('under construction!');
}

exports.get_ps5_home = function(req, res, next){
  res.send('under construction!');
}

exports.get_xbox_home = function(req, res, next){
  res.send('under construction!');
}

exports.get_xboxxbox_home = function(req, res, next){
  res.send('under construction!');
}

exports.get_xbox360_home = function(req, res, next){
  res.send('under construction!');
}

exports.get_xboxone_home = function(req, res, next){
  res.send('under construction!');
}

exports.get_xboxseries_home = function(req, res, next){
  res.send('under construction!');
}

exports.get_nintendo_home = function(req, res, next){
  res.send('under construction!');
}

exports.get_nes_home = function(req, res, next){
  res.send('under construction!');
}

exports.get_snes_home = function(req, res, next){
  res.send('under construction!');
}

exports.get_n64_home = function(req, res, next){
  res.send('under construction!');
}

exports.get_gamecube_home = function(req, res, next){
  res.send('under construction!');
}

exports.get_wii_home = function(req, res, next){
  res.send('under construction!');
}

exports.get_wiiu_home = function(req, res, next){
  res.send('under construction!');
}

exports.get_switch_home = function(req, res, next){
  res.send('under construction!');
}

exports.get_pc_home = function(req, res, next){
  res.send('under construction!');
}

module.exports;