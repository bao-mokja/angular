(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', TestFunction);

TestFunction.$inject = ["$scope"];
    
function TestFunction($scope){    
  $scope.list = "";
  $scope.message = "Please enter data first";

  $scope.displayMessage = function () {
    var listOfItems = $scope.list.split(',')
    if(listOfItems.length <= 3){
        $scope.message = "Enjoy!"
    }
    else if(listOfItems.length > 3){
        $scope.message = "Too much!"
    }
  };


  
}

})();