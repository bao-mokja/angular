(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController ', ToBuyController )
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListService', ShoppingListService);

// LIST #1 - controller
ToBuyController .$inject = ['ShoppingListService'];
function ToBuyController (ShoppingListService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListService.getToBuyItems();
  
  toBuyList.markAsBought = function(itemIndex){
      ShoppingListService.markAsBought(itemIndex);
  }
}


// LIST #2 - controller
AlreadyBoughtController.$inject = ['ShoppingListService'];
function AlreadyBoughtController(ShoppingListService) {
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
      var boughtItem = toBuyItems[itemIndex];
      toBuyItems.splice(itemIndex,1);
      boughtItems.push(boughtItem);
  }
}


})();