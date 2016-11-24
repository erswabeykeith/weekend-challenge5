var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/weekend_5';

router.get('/', function(req, res) {
pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query('SELECT * FROM employees', function(err, result) {
      done(); // close the connection.
      console.log(result);
      res.send(result.rows);
    });
  });
});


module.exports = router;
