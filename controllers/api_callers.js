const axios = require('axios');
Game = require('../models/game');
CoverArt = require('../models/coverart');

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
        data: 'fields name,platforms,age_ratings,aggregated_rating; limit 50; where name = "Destiny";'
    };
    
    let results = await api_get_data(options);

    results.forEach(result => {
        console.log(result);
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
                    cover: result.cover,
                    releaseDate: result.release_dates,
                    platforms: result.platforms
                  });
                /*game.save(function(err){
                    if(err){
                        console.log('Error saving ' + result.name);
                    } else{ 
                        console.log(result.name + ' saved successfully!');
                    };
                });*/
                console.log("made it to the end!");
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
        data: 'fields game,height,url,width; limit 10; where game = 1939;'
    };
    
    let results = await api_get_data(options);

    results.forEach(result => {
        console.log(result);
        CoverArt.findOne({'game': result.game}, function(err, result_found){
            if(err){ console.log('error searching for existing result'); }
            if(result_found != null){
              console.log(result.game + ' already in the database.');
            } else{
                let coverart = new CoverArt({
                    game: result.game,
                    uri: result.url,
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

/*currently loads image urls
exports.load_games2 = async function(){
    let results = 1;
    let pageNum = 1;
    while(pageNum < 10){
        results = await handle_rawg_res('https://api.rawg.io/api/games?key=0563b91ec2664d40a9371b83c2fedce7&platforms=83&page_size=25&page=' + pageNum);
        results.forEach(result => {
            UniversalGame.findOne({'url': result.url}, function(err, result_found){
                if(err){ console.log('error searching for existing result') }
                if(result_found != null){
                    console.log(result.url + ' image is already in the database.')
                } else{
                    let game = new UniversalGame({
                        url: result.url,
                    });
                    game.save(function(err){
                        if(err){
                            console.log('Error saving ' + result.url)
                        } else{ 
                            console.log(result.name + ' saved successfully!');
                        };
                    });
                }
            });
        });
        pageNum++;
    }
}
*/
module.exports;