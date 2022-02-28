const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublisherSchema = new Schema({
  name: {type: String, required: true, maxLength: 100},
  location: {type: String, required: true},
});

PublisherSchema.virtual('url').get(function(){
  return '/catalog/publisher/' + this._id;
});

module.exports = mongoose.model('Publisher', PublisherSchema);
