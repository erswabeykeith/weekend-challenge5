var app = angular.module('myApp', ['ngRoute']);

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
  var self = this;
  self.message = "Employees controller is the best!";

  $http.get('/employees')
   .then(function(response) {
     console.log(response.data);
     self.data = response.data;

   });

}]);
