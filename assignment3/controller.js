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
ItemDetailController.$inject = ['item']
function ItemDetailController(item) {
  var itemDetail = this;
  itemDetail.name = item.name;
  itemDetail.description = item.description;
}

})();