const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const UniversalGameSchema = new Schema({
    name: {type: String, required: true, maxLength: 100},
    rating: {type: Number},
    metacritic: {type: Number}
});

UniversalGameSchema.virtual('url').get(function(){
  return '/catalog/game/' + this._id;
});

/*UniversalGameSchema.virtual('releaseDateFormatted').get(function(){
  return DateTime.fromJSDate(this.releaseDate).toLocaleString(DateTime.DATE_MED);
});

UniversalGameSchema.virtual('game_form_date').get(function(){
	return DateTime.fromJSDate(this.releaseDate).toFormat('yyyy') + '-' + DateTime.fromJSDate(this.releaseDate).toFormat('LL') + '-' + DateTime.fromJSDate(this.releaseDate).toFormat('dd') ;
})
*/
module.exports = mongoose.model('UniversalGame', UniversalGameSchema)