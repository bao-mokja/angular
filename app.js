(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
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
    var list = this;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
    var ctrl = this;
    
    ctrl.searchTerm = "";
    
    ctrl.foundItems = [];
    
    ctrl.warning = "";
    
    
    ctrl.narrowItDown = function(){
        
        if(ctrl.searchTerm === ""){
             ctrl.warning = "Nothing found!";
        }
        else{
            var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
            
            promise.then(function(matchItems){
                ctrl.foundItems = matchItems;
                if(ctrl.foundItems.length === 0){
                    ctrl.warning = "Nothing found!";
                }
            });
        }
    };
    
    ctrl.removeItem = function(itemIndex){
        ctrl.foundItems.splice(itemIndex,1);
    };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
    var service = this;   
    
    service.getMatchedMenuItems = function(searchTerm){
       return $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json")
        })
		.then(function (response) {
            return response.data.menu_items;
        })
		.then(function(menu_items){
            var matchItems = [];
            for(var i = 0; i < menu_items.length; i++){
                if(menu_items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
                    matchItems.push(menu_items[i]);
                }
            }
            return matchItems;
        })
        .catch(function (error) {
            console.log("Something went terribly wrong.");
        });
    };
}

})();

