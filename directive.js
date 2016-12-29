(function () {
'use strict';

angular.module('NarrowItDownApp')
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

function FoundItemsDirective(){
    var ddo = {
        templateUrl: 'menuitems.html',
        scope: {
            items: '<',
            onRemove: '&'
        },
        controller: FoundItemsDirectiveController,
        controllerAs: 'list',
        bindToController: true
    };
    return ddo;
}

function FoundItemsDirectiveController(){

}


})();