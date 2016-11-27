//Angular needs this!
var app = angular.module('myApp', ['ngRoute']);

//These are the routes we are using
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/employees', {
      templateUrl: '/views/templates/employees.html',
      controller: 'EmployeesController',
      controllerAs: 'employees'
    })

    .otherwise({
      redirectTo: 'employees'
    });

}]);

app.controller('EmployeesController', ["$http", function($http) {
  console.log('employees controller running');
  // self.message = "Employees controller is the best!";

  var self = this;
  self.employees = [];
  self.newEmployee = {};

  getEmployees();


function getEmployees() {
  $http.get('/employees')
   .then(function(response) {
     console.log(response.data);
     self.data = response.data;

   });
 }

   // tied to DOM thru self object
   self.addEmployee = function() {
     console.log('new employee: ', self.newEmployee);
     $http.post('/employees', self.newEmployee)
       .then(function(response) {
         console.log('POST finished. Get employees again.');
         self.newEmployee = {};
         getEmployees();
       });
   }
   }]);

//    self.deleteEmployee = function(employee) {
//      var id = employee.id;
//      console.log(employee.id);
//      $http.delete('/employees/' + id)
//        .then(function(response) {
//          console.log('DELETE finished. Get employees again.');
//          getEmployees();
//        });
//    }
// }]);
