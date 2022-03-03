const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {DateTime} = require('luxon');

const GameInstanceSchema = new Schema({
  game: {type: Schema.Types.ObjectId, ref: 'Game'},
  isbn: {type: String, required: true, maxLength: 100},
  status: {type: String, required: true, enum:['Unreleased', 'Available', 'Loaned', 'Reserved']},
  due_date: {type: Date, required: true, default: Date.now}
});

GameInstanceSchema.virtual('url').get(function(){
  return '/catalog/gameinstance/' + this._id;
});

GameInstanceSchema.virtual('due_date_formatted').get(function(){
  return DateTime.fromJSDate(this.due_date).toLocaleString(DateTime.DATE_MED);
})

module.exports = mongoose.model('Game Instance', GameInstanceSchema);
