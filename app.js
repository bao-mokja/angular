(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ShoppingListController1', ShoppingListController1)
.controller('ShoppingListController2', ShoppingListController2)
.service('ShoppingListService', ShoppingListService);

// LIST #1 - controller
ShoppingListController1.$inject = ['ShoppingListService'];
function ShoppingListController1(ShoppingListService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListService.getToBuyItems();
  
  toBuyList.markAsBought = function(itemIndex){
      ShoppingListService.markAsBought(itemIndex);
  }
}


// LIST #2 - controller
ShoppingListController2.$inject = ['ShoppingListFactory'];
function ShoppingListController2(ShoppingListService) {
  var boughtList = this;

  boughtList.items = ShoppingListService.getBoughtItems();
}


function ShoppingListService() {
  var service = this;

  var toBuyItems = [{ name: "cookies", quantity: 10 },
                    { name: "chips", quantity: 10 },
                    { name: "cokes", quantity: 10 },
                    { name: "plates", quantity: 10 },
                    { name: "forks", quantity: 10 },
                    { name: "cups", quantity: 10 }];
  var boughtItems = [];

  service.getToBuyItems = function () {
    return toBuyItems;
  };
  
  service.getBoughtItems = function () {
    return boughtItems;
  };
  
  service.markAsBought = function(itemIndex){
      boughtItems.push(toBuyItems.splice(itemIndex,1))
  }
}


})();