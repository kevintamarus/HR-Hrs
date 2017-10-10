const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const log = require('./seed-data');

const hoursSchema = new Schema({
  date: String,
  arrived: String,
  left: String
});

const Hours = mongoose.model('hours', hoursSchema);

Hours.remove({}, function(err) {
  console.log('trying to delete data');
  if(err) {
    console.log('did not delete data');
  }
});
Hours.create(log, function(err, results) {
  if(err) {
    console.log('data did not seed');
  } else {
    console.log('seeding successful');
  }
});
module.exports = Hours;