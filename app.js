(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController ', ToBuyController )
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// LIST #1 - controller
ToBuyController .$inject = ['ShoppingListCheckOffService'];
function ToBuyController (ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListCheckOffService.getToBuyItems();
  
  toBuyList.markAsBought = function(itemIndex){
      ShoppingListCheckOffService.markAsBought(itemIndex);
  }
}


// LIST #2 - controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService() {
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