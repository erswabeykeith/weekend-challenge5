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

    client.query('SELECT * FROM employees;', function(err, result) {
      done(); // close the connection.
      console.log(result);

      if(err) {
              console.log('select query error: ', err);
              res.sendStatus(500);
            }

      res.send(result.rows);
    });
  });
});

router.post('/', function(req, res) {
  var newEmployee = req.body;
  console.log(newEmployee);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'INSERT INTO employees (first_name, last_name, employee_id, employee_job, employee_salary) ' +
      'VALUES ($1, $2, $3, $4, $5)',
      [newEmployee.firstName, newEmployee.lastName, newEmployee.employeeId, newEmployee.jobTitle, newEmployee.annualSalary],
      function(err, result) {
        done();
        console.log("data inserted!")

        if(err) {
          console.log('insert query error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });

  });

});

router.delete('/:id', function(req, res) {
  employeeID = req.params.id;

  console.log('employeeID id to delete: ', employeeID);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'DELETE FROM employees WHERE id = $1',
      [employeeID],
      function(err, result) {
        done();

        if(err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    });

});


module.exports = router;
