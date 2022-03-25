const request = require('request')

exports.api_req_games = function(url){
    return new Promise((resolve, reject) => {
        request(url, { json: true }, (err, res, body) => {
            if (err) reject(err)
            resolve(body);
        });
    });
}

module.exports;