const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameInstanceSchema = new Schema({
  game: {type: Schema.Types.ObjectId, ref: 'Game'},
  isbn: {type: String, required: true, maxLength: 100},
  availability: {type: String, required: true, enum:['unreleased', 'available', 'loaned', 'reserved']},
  due_date: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Game Instance', GameInstanceSchema);
