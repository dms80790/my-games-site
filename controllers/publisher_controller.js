const async = require('async');
const Game = require('../models/game');
const api_callers = require('./api_callers');

exports.get_home_page = function(req, res, next){
  //api_callers.load_games();
  //let timeInterval = Math.floor(Date.now() / 1000) - 46552000;
  //console.log(timeInterval);
  Game.find({})
      .limit(4)
      .exec(function(err, games){
        if(err){ return next(err); }
        if(games){
        return res.render('index', {games_list: games});
        }
        else{ res.render('index', {cover1: 'https://images.igdb.com/igdb/image/'});}
      }); 
    
    //res.send('loaded');    
}

module.exports