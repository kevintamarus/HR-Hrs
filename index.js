const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 8080;

//middleware
app.use(express.static(__dirname + '/client/static'));
app.use(bodyParser.json());

//connecting mongo database
const mongoose = require('mongoose');
const keys = require('./config/keys');
const mongoLink = keys.mongoURI;
mongoose.connect(mongoLink);

//exported model
const Hours = require('./db/models/hours');

//handles get requests
app.get('/hours', function(req,res) {
  Hours.find({})
  .then(function(data) {
    res.send(data);
    console.log('sucessfully retrieved data');
  })
  .catch(function(err) {
    res.send(err);
    console.log('GET request error');
  })
})

//handles post requests
app.post('/hours', function(req, res) {
  let hours = new Hours ({
    date: 'July 31',
    arrived: '8:30am',
    left: '11:00pm'
  })
  hours.save( function(err, data) {
    if(err) {
      return "model creation failed";
    } else {
      return "model creation success";
    }
  })
  res.send('POST received');
})

app.listen(PORT, function(err) {
  if(err) {
    console.log('cannot connect to server');
  } else {
    console.log('listening on PORT', PORT);
  }
})