(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', TestFunction);

TestFunction.$inject = ["$scope"];
    
function TestFunction($scope){    
  $scope.list = "";
  $scope.message = "Please enter data first";
  $scope.textColor = "red";

  $scope.displayMessage = function () {
    var listOfItems = $scope.list.split(',').filter(String)
    if(listOfItems.length > 0 && listOfItems.length <= 3){
        $scope.message = "Enjoy!"
        $scope.textColor = "green"
    }
    else if(listOfItems.length > 3){
        $scope.message = "Too much!"
        $scope.textColor = "green"
    }
    else{
        $scope.message = "Please enter data first"
        $scope.textColor = "red"
    }
  };


  
}

})();