var express = require('express');
var morgan = require('morgan');

var app = express();
app.use(morgan('dev'));

app.use("/", express.static(__dirname + '/../client'));

app.listen(8080, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('Listening on port 8080');
  }
});

module.exports = app;
