const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const GameSchema = new Schema({
  name: {type: String, required: true, maxLength: 100},
  criticScore: {type: Number, required: false},
  ratings: [{type: Schema.Types.ObjectId, ref: 'AgeRatings'}],
  genres: [{type: Schema.Types.ObjectId, ref: 'Genre'}],
  summary: {type: String, required: false},
  platforms: [{type: Schema.Types.ObjectId, ref: 'Platform'}],
  cover: {type: Schema.Types.ObjectId, ref: 'CoverArt'},
  releaseDate: [{type: Schema.Types.ObjectId, ref: 'ReleaseDate'}]
});

GameSchema.virtual('url').get(function(){
  return '/catalog/game/' + this._id;
});

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