const axios = require('axios');
Game = require('../models/game');
Platform = require('../models/platform');

const api_get_data = async function(options){
    try{
        const response = await axios(options);
        return response.data;
    } catch(err) {
        console.error(err);
    }
}

//note: only loads nintendo, xbox, playstation and pc platforms
exports.load_platforms = async function(platform_array){
    const options = {
        headers: {
        'Accept': 'application/json',
        'Client-ID': 'rlireybc2vzfx754yy2ndlom4xx3gt',
        'Authorization': 'Bearer h4s96pavrqvp3qcmwyq6sm9xq70ltx',
        },
        method: 'POST',
        url: "https://api.igdb.com/v4/platforms",
        data: `fields id,name,platform_family,url; limit: 500; where id = (${platform_array.toString()});`
    };
    
    let results = await api_get_data(options);

    results.forEach(result => {
        Platform.findOne({id: result.id}, function(err, result_found){
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

exports.load_games = async function(){
    const options = {
        headers: {
        'Accept': 'application/json',
        'Client-ID': 'rlireybc2vzfx754yy2ndlom4xx3gt',
        'Authorization': 'Bearer h4s96pavrqvp3qcmwyq6sm9xq70ltx',
        },
        method: 'POST',
        url: "https://api.igdb.com/v4/games",
        data: 'fields name,platforms,age_ratings,aggregated_rating, cover.image_id; limit: 10; where cover != null & platforms = 4; offset: 100; '
    };
    
    let results = await api_get_data(options);
    let platform_array;

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
                        result.platforms.forEach(platform => {
                            if(!platform_array.includes(platform)){
                                platform_array.push(platform);
                            }
                        });
                    }
                });
            }
        });
    });
    load_platforms(platform_array);
}
module.exports;