var path = require('path');
var express = require('express');
var app = express();

const process = require('process');

const port = process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var staticPath = path.join(__dirname, '/app');
app.use(express.static(staticPath));

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});