const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hoursSchema = new Schema({
  date: String,
  arrived: String,
  left: String
});

const Hours = mongoose.model('hours', hoursSchema);

module.exports = Hours;