const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  title: {type: String, required: true, maxLength: 100},
  description: {type: String, required: true},
  genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}],
  release_date: {type: Date, required: true, default: Date.now},
  publisher: {type: Schema.Types.ObjectId, ref: 'Publisher'},
  platform: {type: Schema.Types.ObjectId, ref: 'Platform'}
});

//create the model from the schema and export
module.exports = mongoose.model('Game', GameSchema);
