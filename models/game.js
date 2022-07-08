const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const GameSchema = new Schema({
  name: {type: String, required: true, maxLength: 100},
  criticScore: {type: Number, required: false},
  numCriticScores: {type: Number},
  ratings: [{type: Number}],
  genres: [{type: Number}],
  summary: {type: String, required: false},
  platforms: [{type: String, maxLength: 100}],
  cover_img_id: {type: String},
  screenshots: [{id: String, image_id: String}],
  releaseDate: [{id: String, date: Number}],
});

GameSchema.virtual('url').get(function(){
  return '/catalog/game/' + this._id;
});

GameSchema.virtual('cover_url').get(function(){
  return 'https://images.igdb.com/igdb/image/upload/t_cover_big/' + this.cover_img_id + '.png';
});

GameSchema.virtual('date_formatted').get(function(){
  return DateTime.fromSeconds(this.releaseDate[0].date).toLocaleString(DateTime.DATE_FULL);
});

GameSchema.methods.getScreenshotUrl = function(i){
  return 'https://images.igdb.com/igdb/image/upload/t_thumb_widescreen_large/' + this.screenshots[i].image_id + '.png';
};

/*
GameSchema.virtual('release_date_formatted').get(function(){
  return DateTime.fromJSDate(this.release_date).toLocaleString(DateTime.DATE_MED);
});

GameSchema.virtual('game_form_date').get(function(){
	return DateTime.fromJSDate(this.release_date).toFormat('yyyy') + '-' + DateTime.fromJSDate(this.release_date).toFormat('LL') + '-' + DateTime.fromJSDate(this.release_date).toFormat('dd') ;
})
*/
//create the model from the schema and export
module.exports = mongoose.model('Game', GameSchema);
