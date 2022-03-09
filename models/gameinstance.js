const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {DateTime} = require('luxon');

const GameInstanceSchema = new Schema({
  game: {type: Schema.Types.ObjectId, ref: 'Game'},
  isbn: {type: String, required: true, maxLength: 100},
  status: {type: String, required: true, enum:['Unreleased', 'Available', 'Loaned', 'Reserved']},
  dueBack: {type: Date, required: true, default: Date.now}
});

GameInstanceSchema.virtual('url').get(function(){
  return '/catalog/gameinstance/' + this._id;
});

GameInstanceSchema.virtual('due_date_formatted').get(function(){
  return DateTime.fromJSDate(this.dueBack).toLocaleString(DateTime.DATE_MED);
})

GameInstanceSchema.virtual('game_form_date').get(function(){
	return DateTime.fromJSDate(this.dueBack).toFormat('yyyy') + '-' + DateTime.fromJSDate(this.dueBack).toFormat('LL') + '-' + DateTime.fromJSDate(this.dueBack).toFormat('dd') ;
})

module.exports = mongoose.model('Game Instance', GameInstanceSchema);
