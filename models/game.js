const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const GameSchema = new Schema({
  title: {type: String, required: true, maxLength: 100},
  description: {type: String, required: true},
  genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}],
  release_date: {type: Date, required: true, default: Date.now},
  publisher: {type: Schema.Types.ObjectId, ref: 'Publisher'},
  platform: [{type: Schema.Types.ObjectId, ref: 'Platform'}]
});

GameSchema.virtual('url').get(function(){
  return '/catalog/game/' + this._id;
});

GameSchema.virtual('release_date_formatted').get(function(){
  return DateTime.fromJSDate(this.release_date).toLocaleString(DateTime.DATE_MED);
});

GameSchema.virtual('game_form_date').get(function(){
	return DateTime.fromJSDate(this.release_date).toFormat('yyyy') + '-' + DateTime.fromJSDate(this.release_date).toFormat('LL') + '-' + DateTime.fromJSDate(this.release_date).toFormat('dd') ;
})

//create the model from the schema and export
module.exports = mongoose.model('Game', GameSchema);
