(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService', MenuSearchService);
//.directive('foundItems', FoundItemsDirective)


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


NarrowItDownController.$inject = ['MenuSearchService']
function NarrowItDownController(MenuSearchService){
    var ctrl = this;
    
    ctrl.searchTerm = "";
    
    
    ctrl.narrowItDown = function(){
        ctrl.foundItems = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
    }
    
    ctrl.removeItem = function(itemIndex){
        ctrl.foundItems.splice(itemIndex,1);
    }
}


})();

MenuSearchService.$inject = ['$http', 'ApiPath'];
function MenuSearchService($http, ApiPath){
    var service = this;
    
    
    service.getMatchedMenuItems = function(searchTerm){
        var foundItems;
        //if(searchTerm === ""){
         //   return foundItems;
        //}
        var promise = $http({
            method: "GET",
            url: "http://davids-restaurant.herokuapp.com/menu_items.json"
        });
        promise.then(function (response) {
            foundItems = response.data;
            //menuItems.forEach(function(entry){
              //  if(entry.description.indexOf(searchTerm)!==-1){
                //    foundItems.push(entry);
                //}
            //});
        })
        .catch(function (error) {
            console.log("Nothing found");
        })
        
        var item = {
            name : "bao",
            short_name : "b",
            description : "test"
        }
        foundItems.push(item);
        return foundItems;
    }
}