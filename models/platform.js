const mongoose = require('mongoose');
const Schema = mongoose.Schema;
///const { DateTime } = require('luxon');

const PlatformSchema = new Schema({
  id: {type: Number, required: true},
  name: {type: String, required: true, maxLength: 100},
  logo_url: {type: String},
  company: {type: String, maxLength: 100},
});

module.exports = mongoose.model('Platform', PlatformSchema);
