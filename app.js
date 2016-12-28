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
        bindToController: true,
        link: FoundItemsDirectiveLink
    };
    return ddo;
}

function FoundItemsDirectiveLink(scope, element, attrs, controller) {
    
    scope.$watch('list.isListEmpty()', function(newValue, oldValue){
        if (newValue === true) {
            displayWarning();
        }
        else{
            removeWarning();
        }
    });
    
    function displayWarning() {
        var warningElem = element.find("span.warning");
        warningElem.slideDown(900);
    }
    
    function removeWarning() {
        var warningElem = element.find("span.warning");
        warningElem.slideUp(900);
    }
}

function FoundItemsDirectiveController(){
    
    var list = this;
    
    list.isListEmpty = function(){
        return list.items.length == 0;
    };
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
    var ctrl = this;
    
    ctrl.searchTerm = "";
    
    ctrl.foundItems = [];
    
    
    ctrl.narrowItDown = function(){
        
        var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
        
        promise.then(function(matchItems){
            ctrl.foundItems = matchItems;
        });
        
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

