(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
//.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");


/*function FoundItemsDirective(){
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
        var warningElem = element.find("div.warning");
        warningElem.slideDown(900);
    }
    
    function removeWarning() {
        var warningElem = element.find("div.warning");
        warningElem.slideUp(900);
    }
}

function FoundItemsDirectiveController(){
    
    var list = this;
    
    list.isListEmpty = function(){
        return list.items.length === 0;
    };
}*/


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
    var ctrl = this;
    
    ctrl.searchTerm = "";
    
    ctrl.foundItems = [];
    
    
    ctrl.narrowItDown = function(){
        
        ctrl.foundItems = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
        
       
    };
    
    ctrl.removeItem = function(itemIndex){
        ctrl.foundItems.splice(itemIndex,1);
    };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
    var service = this;
    
    service.foundItems = [];
    
    service.getMatchedMenuItems = function(searchTerm){
       var promise = $http({
            method: "GET",
            url: (ApiBasePath + "/categories.json")
        });
        promise.then(function (response) {
             service.foundItems = response.data;
        })
        .catch(function (error) {
            console.log("Something went terribly wrong.");
        });
        return service.foundItems;
    };
}

})();

