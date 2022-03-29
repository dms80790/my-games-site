;const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const UniversalPlatformSchema = new Schema({
  name: {type: String, required: true, maxLength: 100},
  rating: {type: Number, required: true},
  //releaseDate: {type: Date, required: true, default: Date.now}
});

UniversalPlatformSchema.virtual('url').get(function(){
  return '/catalog/platform/' + this._id;
});

/*UniversalPlatformSchema.virtual('releaseDateFormatted').get(function(){
  return DateTime.fromJSDate(this.releaseDate).toLocaleString(DateTime.DATE_MED);
});

UniversalPlatformSchema.virtual('platform_form_date').get(function(){
	return DateTime.fromJSDate(this.releaseDate).toFormat('yyyy') + '-' + DateTime.fromJSDate(this.releaseDate).toFormat('LL') + '-' + DateTime.fromJSDate(this.releaseDate).toFormat('dd') ;
})
*/
module.exports = mongoose.model('UniversalPlatform', UniversalPlatformSchema)