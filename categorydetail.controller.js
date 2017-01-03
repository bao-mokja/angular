(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoryDetailController',CategoryDetailController);

CategoryDetailController.$inject = ['MenuDataService','$stateParams', 'categories'];
function CategoryDetailController(MenuDataService,$stateParams, categories) {
    var ctrl = this;
    var category = categories[$stateParams.itemId].short_name;
    
    var promise = MenuDataService.getItemsForCategory(category);
    promise.then(function(menu_items){
        ctrl.items = menu_items;
        console.log("Found " + ctrl.items.length + " for " + category);
    });
    
    
   
}


})();