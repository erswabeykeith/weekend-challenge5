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

//Default route
    .otherwise({
      redirectTo: 'employees'
    });

}]);
//Controller for the employees
app.controller('EmployeesController', ["$http", function($http) {
  console.log('employees controller running');
  // self.message = "Employees controller is the best!";

//Define this, and an empty array and object
  var self = this;
  self.employees = [];
  self.newEmployee = {};

//Get employees request made
getEmployees();
function getEmployees() {
  $http.get('/employees')
   .then(function(response) {
     console.log(response.data);
     self.employees = response.data; //WTF is up with it going blank when I put in "employees" instead of "data"?
     //empty variable to hold total salary
           var totalSalary = 0;
           //loops thru the employeeArray and adds salary to total salary
           for(var i = 0; i < self.employees.length; i++) {
             totalSalary += Number(self.employees[i].employee_salary);
           }
           //set the monthly salary for angular proper
           self.monthlySalary = Math.round(totalSalary/12);

   });
 }

   //POST request to add an employee; tied to DOM thru self object
   self.addEmployee = function(employee) {
     console.log('new employee: ', self.newEmployee);
     $http.post('/employees', self.newEmployee)
       .then(function(response) {
         console.log('POST finished. Get employees again.');
         self.newEmployee = {};
         getEmployees()
         console.log("got employees");
       });
   }
//Delete request to delete employee
   self.deleteEmployee = function(employee) {
     var id = employee.id;
     console.log(employee.id);
     $http.delete('/employees/' + id)
       .then(function(response) {
         console.log('DELETE finished. Get employees again.');
         getEmployees();
         console.log("got employees again");
       });
   }
}]);
