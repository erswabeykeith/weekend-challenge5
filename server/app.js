var express =  require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var employees = require('./routes/employees');

// Needed by Angular
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware that doesn't do much
app.use(function(req, res, next) {
  console.log('hello from express!');
  next();
});

// Our routes
app.use('/employees', employees);

// Catchall route
app.get('/', function (req, res) {
  res.sendFile(path.resolve('./server/public/views/index.html'));
});

// Static route
app.use(express.static('./server/public'));

//Port setup
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('Listening on port ', app.get('port'));
});
