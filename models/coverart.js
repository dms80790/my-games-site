const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoverArtSchema = new Schema({
  game: {type: Number, required: true},
  height: {type: Number, required: false, default: 500},
  width: {type: Number, required: false, default: 500},
  uri: {type: String, required: true}
});

CoverArtSchema.virtual('url').get(function(){
  return '/catalog/game/' + this._id;
});

/*
GameSchema.virtual('release_date_formatted').get(function(){
  return DateTime.fromJSDate(this.release_date).toLocaleString(DateTime.DATE_MED);
});

GameSchema.virtual('game_form_date').get(function(){
	return DateTime.fromJSDate(this.release_date).toFormat('yyyy') + '-' + DateTime.fromJSDate(this.release_date).toFormat('LL') + '-' + DateTime.fromJSDate(this.release_date).toFormat('dd') ;
})


id: 82104,
  alpha_channel: false,
  animated: false,
  game: 1939,
  height: 897,
  image_id: 'co1rco',
  url: '//images.igdb.com/igdb/image/upload/t_thumb/co1rco.jpg',
  width: 673,
  checksum: '6262ce15-5fd4-c644-5c24-3031eaefef67'
*/
//create the model from the schema and export
module.exports = mongoose.model('CoverArt', CoverArtSchema);