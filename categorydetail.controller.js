(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoryDetailController',CategoryDetailController);

CategoryDetailController.$inject = ['MenuDataService','$stateParams', 'categories'];
function CategoryDetailController(MenuDataService,$stateParams, categories) {
    var ctrl = this;
    var category = categories[$stateParams.itemId].short_name;
    console.log("Look for: "+ category);
    ctrl.items = MenuDataService.getItemsForCategory(category);
}


})();