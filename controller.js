(function () {
'use strict';

angular.module('NarrowItDownApp')
.controller('NarrowItDownController',NarrowItDownController);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
    var ctrl = this;
    
    ctrl.searchTerm = "";
    
    ctrl.foundItems = [];
    
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
                    ctrl.foundItems = [];
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

})();