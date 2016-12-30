(function () {
'use strict';

angular.module('NarrowItDownApp')
.controller('NarrowItDownController',NarrowItDownController)
.controller('ItemDetailController', ItemDetailController);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
    var ctrl = this;
    
    ctrl.searchTerm = "";
    
    ctrl.foundItems = MenuSearchService.getFetchedItems();
    
    ctrl.warning = "";
    
    
    ctrl.narrowItDown = function(){
        
        if(ctrl.searchTerm === ""){
            ctrl.warning = "Nothing found!";
            ctrl.foundItems = [];
        }
        else{
            var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
            
            promise.then(function(matchItems){
                ctrl.foundItems = matchItems;
                if(ctrl.foundItems.length === 0){
                    ctrl.warning = "Nothing found!";
                }
                else{
                    ctrl.warning = "";
                }
            });
        }
    };
    
    ctrl.removeItem = function(itemIndex){
        ctrl.foundItems.splice(itemIndex,1);
    };
}



// 'item' is injected through state's resolve
ItemDetailController.$inject = ['$stateParams', 'MenuSearchService']
function ItemDetailController($stateParams, MenuSearchService) {
  var itemDetail = this;
  var item = MenuSearchService.getFetchedItem([$stateParams.itemId]);
  itemDetail.name = item.name;
  itemDetail.description = item.description;
  itemDetail.price_small = item.price_small;
  itemDetail.small_portion_name = item.small_portion_name;
  itemDetail.price_large = item.price_large;
  itemDetail.large_portion_name = item.large_portion_name;
}

})();