const request = require('request')
const UniversalPlatform = require('../models/universalplatform');
const UniversalGame = require('../models/universalgame');

const rawg_api_get_data = function(url){
    return new Promise((resolve, reject) => {
        request(url, {json: true}, (err, res, body) => {
            if (err) reject(err);
            resolve(body);
        });
    });
}

async function handle_rawg_res(url){
    let results;

    try{
        results = await rawg_api_get_data(url);
    } catch(error){
        console.log("Error: " + error);
    }

    console.log('/////////////////////////////////////////////')
    return results.results;
}

exports.load_platforms = async function(){
    let results = await handle_rawg_res('https://api.rawg.io/api/platforms?key=0563b91ec2664d40a9371b83c2fedce7'); 

    results.forEach(result => {
        console.log(result.name + result.id);
        UniversalPlatform.findOne({'name': result.name}, function(err, result_found){
            if(err){ console.log('error searching for existing result') }
            if(result_found != null){
              console.log(result.name + ' already in the database.')
            } else{
                let platform = new UniversalPlatform({
                    name: result.name,
                    numGames: result.games_count,
                    releaseDate: result.year_start
                  });
                platform.save(function(err){
                    if(err){
                        console.log('Error saving ' + result.name)
                    } else{ 
                        console.log(result.name + ' saved successfully!');
                    };
                });
            }
        });
    });
}

//currently loads N64 games
exports.load_games = async function(){
    let results = 1;
    let pageNum = 1;
    while(pageNum < 10){
        results = await handle_rawg_res('https://api.rawg.io/api/games?key=0563b91ec2664d40a9371b83c2fedce7&platforms=83&page_size=25&page=' + pageNum);
        results.forEach(result => {
            UniversalGame.findOne({'name': result.name}, function(err, result_found){
                if(err){ console.log('error searching for existing result') }
                if(result_found != null){
                    console.log(result.name + ' already in the database.')
                } else{
                    let game = new UniversalGame({
                        name: result.name,
                        rating: result.rating,
                        metacritic: result.metacritic
                    });
                    game.save(function(err){
                        if(err){
                            console.log('Error saving ' + result.name)
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
module.exports;