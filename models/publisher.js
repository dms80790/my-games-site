const mongoose = require(mongoose);
const Schema = mongoose.Schema;

const PublisherSchema = new Schema({
  name: {type: String, required: true, maxLength: 100},
  location: {type: String, required: true},
});

module.exports = mongoose.model(PublisherSchema);
