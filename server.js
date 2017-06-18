var Restaraunts = [
  {
    'name': 'Thai Son',
    'location': 'Garden City Plaza Alderbridge Road, Richmond BC',
    'price': '~$10'
  },
  {
    'name': 'White Spot',
    'location': 'Richmond Center, Richmond BC',
    'price': '~$20'
  },
  {
    'name': 'Dinesty',
    'location': 'Dinesty Number 3 Road, Richmond BC',
    'price': '~$25'
  },
];

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/api/foods', function(req, res) {
  res.send(Restaraunts);
});

app.post('/api/foods', function(req, res) {
  Restaraunts.push({
    'name': req.body.name,
    'location': req.body.location,
    'price': req.body.price
  });
});

app.post('/api/rm', function(req, res) {
  Restaraunts.forEach(function(restaraunt) {
    if (restaraunt.name === req.body.name && restaraunt.location === req.body.location) {
      Restaraunts.splice(Restaraunts.indexOf(restaraunt), 1);
    }
  });
});

module.exports = app;












