(function () {
'use strict';

angular.module('NarrowItDownApp')
.controller('CategoriesController',CategoriesController);

CategoriesController.$inject = ['MenuDataService', 'items'];
function CategoriesController(MenuDataService, items) {
  var categoriesCtrl = this;
  categoriesCtrl.items = items;
}






})();