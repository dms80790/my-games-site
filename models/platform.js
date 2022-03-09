const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const PlatformSchema = new Schema({
  name: {type: String, required: true, maxLength: 100},
  company: {type: String, required: true, maxLength: 100},
  releaseDate: {type: Date, required: true, default: Date.now}
});

PlatformSchema.virtual('url').get(function(){
  return '/catalog/platform/' + this._id;
});

PlatformSchema.virtual('releaseDateFormatted').get(function(){
  return DateTime.fromJSDate(this.releaseDate).toLocaleString(DateTime.DATE_MED);
});

PlatformSchema.virtual('platform_form_date').get(function(){
	return DateTime.fromJSDate(this.releaseDate).toFormat('yyyy') + '-' + DateTime.fromJSDate(this.releaseDate).toFormat('LL') + '-' + DateTime.fromJSDate(this.releaseDate).toFormat('dd') ;
})

module.exports = mongoose.model('Platform', PlatformSchema);
