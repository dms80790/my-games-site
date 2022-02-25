const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: {type: String, required: true, maxLength: 100},
});

module.exports = mongoose.model('Genre', GenreSchema);
