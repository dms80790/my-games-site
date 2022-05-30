const axios = require('axios');
Game = require('../models/game');
CoverArt = require('../models/coverart');
Platform = require('../models/platform');

const api_get_data = async function(options){
    try{
        const response = await axios(options);
        return response.data;
    } catch(err) {
        console.error(err);
    }
}

exports.load_games = async function(){
    const options = {
        headers: {
        'Accept': 'application/json',
        'Client-ID': 'rlireybc2vzfx754yy2ndlom4xx3gt',
        'Authorization': 'Bearer h4s96pavrqvp3qcmwyq6sm9xq70ltx',
        },
        method: 'POST',
        url: "https://api.igdb.com/v4/games",
        data: 'fields name,platforms,age_ratings,aggregated_rating, cover.image_id; limit 100; where cover != null & follows > 100; sort: releaseDate desc;',
    };
    
    let results = await api_get_data(options);

    results.forEach(result => {
        Game.findOne({'name': result.name}, function(err, result_found){
            if(err){ console.log('error searching for existing result'); }
            if(result_found != null){
              console.log(result.name + ' already in the database.');
            } else{
                let game = new Game({
                    name: result.name,
                    criticScore: result.aggregated_rating,
                    rating: result.age_ratings,
                    genres: result.genres,
                    summary: result.summary,
                    releaseDate: result.release_dates,
                    platforms: result.platforms,
                    cover_img_id: result.cover.image_id
                  });
                game.save(function(err){
                    if(err){
                        console.log('Error saving ' + result.name);
                        console.log(err);
                    } else{ 
                        console.log(result.name + ' saved successfully!');
                    };
                });
            }
        });
    });
}

exports.load_covers = async function(){
    const options = {
        headers: {
        'Accept': 'application/json',
        'Client-ID': 'rlireybc2vzfx754yy2ndlom4xx3gt',
        'Authorization': 'Bearer h4s96pavrqvp3qcmwyq6sm9xq70ltx',
        },
        method: 'POST',
        url: "https://api.igdb.com/v4/covers",
        data: 'fields game,height,image_id,width; limit 10;'
    };
    
    let results = await api_get_data(options);

    results.forEach(result => {
        CoverArt.findOne({'game': 'America'}, function(err, result_found){
            if(err){ console.log('error searching for existing result'); }
            if(result_found != null){
              console.log(result.game + ' already in the database.');
            } else{
                console.log('found!');
                let coverart = new CoverArt({
                    game: result.game,
                    uri: result.image_id,
                    height: result.height,
                    width: result.width,
                  });
                coverart.save(function(err){
                    if(err){
                        console.log('Error saving ' + result.game);
                    } else{ 
                        console.log(result.game + ' saved successfully!');
                    };
                });
            }
            
        });
        console.log("made it to the end!");
    });
}

exports.load_platforms = async function(){
    const options = {
        headers: {
        'Accept': 'application/json',
        'Client-ID': 'rlireybc2vzfx754yy2ndlom4xx3gt',
        'Authorization': 'Bearer h4s96pavrqvp3qcmwyq6sm9xq70ltx',
        },
        method: 'POST',
        url: "https://api.igdb.com/v4/platforms",
        data: 'fields id,name,platform_family,url; limit: 500;'
    };
    
    let results = await api_get_data(options);

    results.forEach(result => {
        Platform.findOne({name: result.name}, function(err, result_found){
            if(err){ console.log('error searching for existing result'); }
            if(result_found != null){
              console.log(result.name + ' already in the database.');
            } else{
                console.log('here!');
                let platform = new Platform({
                    id: result.id,
                    name: result.name,
                    logo_url: result.url,
                    company: result.platform_family,
                  });
                platform.save(function(err){
                    if(err){
                        console.log('Error saving ' + result.name);
                        console.log(err);
                    } else{ 
                        console.log(result.name + ' saved successfully!');
                    };
                });
            }
            
        });
        console.log("made it to the end!");
    });
}
module.exports;