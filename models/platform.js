const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const PlatformSchema = new Schema({
  name: {type: String, required: true, maxLength: 100},
  company: {type: String, required: true, maxLength: 100},
  releaseYear: {type: Date, required: true, default: Date.now}
});

PlatformSchema.virtual('url').get(function(){
  return '/catalog/platform/' + this._id;
});

PlatformSchema.virtual('releaseYearFormatted').get(function(){
  return DateTime.fromJSDate(this.releaseYear).toLocaleString(DateTime.DATE_MED);
});


module.exports = mongoose.model('Platform', PlatformSchema);
