var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function() {
  console.log('Listening on port 3000');
});

module.exports = app;