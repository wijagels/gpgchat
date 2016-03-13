var app = angular.module("myApp", []);

app.controller('controller', ['$scope', '$http', '$window', function($scope, $http, $window) { 

  $scope.add = function() {
    console.log("test");
  };
}]);
