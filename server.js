var path = require('path');
var express = require('express');
var app = express();

const process = require('process');

// Listen to port 80. Remember to run as SUDO or
// the app will throw an error
const port = process.env.PORT || 80;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var staticPath = path.join(__dirname, '/app');
app.use(express.static(staticPath));

app.listen(80, function() {
  console.log(`listening on port ${port}`);
});
