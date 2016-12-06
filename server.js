var express = require('express');
var path = require('path');

var serverdata = {
  foods: [
    {
      name: 'Popsons',
      location: '998 Market St',
      price: '~$12'
    },
    {
      name: 'Katana-Ya',
      location: '430 Geary St',
      price: '~$15'
    },
    {
      name: 'Panda Express',
      location: '865 Market St',
      price: '~$10'
    }
  ]
};

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function() {
  console.log('Listening on port 3000');
});

app.get('/api/foods', function(req, res) {
  console.log(serverdata);
  res.send(serverdata);
});

app.post('/api/foods', function(req, res) {
  console.log(serverdata);
  res.send(serverdata);
});

module.exports = app;












