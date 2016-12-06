var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/mvp');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 


var FoodSchema = new mongoose.Schema({
  name: String,
  location: String,
  price: String
});

var Food = mongoose.model('Food', FoodSchema);

app.listen(3000, function() {
  console.log('Listening on port 3000');
});

app.get('/api/foods', function(req, res) {
  Food.find({}, function(err, foods) {
  }).then(function(foods) {
    res.send(foods);
  });
});

app.post('/api/foods', function(req, res) {
  Food.create({
    name: req.body.name,
    location: req.body.location,
    price: req.body.price
  });
});

app.post('/api/rm', function(req, res) {
  Food.remove({
    name: req.body.name,
    location: req.body.location,
    price: req.body.price
  }, function(err) {
    if (err) {
      console.log('Error removing', req.body);
    }
  });
});

module.exports = app;












