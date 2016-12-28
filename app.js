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


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
    var ctrl = this;
    
    ctrl.searchTerm = "";
    
    ctrl.foundItems = [];
    
    var item = {
        name: 'Bao',
        short_name : 'B',
        description : "test"
    };
    
    ctrl.foundItems.push(item);
    
    ctrl.narrowItDown = function(){
        
        ctrl.foundItems = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
    };
    
    ctrl.removeItem = function(itemIndex){
        ctrl.foundItems.splice(itemIndex,1);
    };
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http){
    var service = this;
    
    service.foundItems = [];
    
    service.getMatchedMenuItems = function(searchTerm){
        /*if(searchTerm === ""){
            return items;
        }*/
        var promise = $http({
            method: "GET",
            url: "http://davids-restaurant.herokuapp.com/menu_items.json"
        });
        promise.then(function (response) {
            service.foundItems = response.data;
            //menuItems.forEach(function(entry){
              //  if(entry.description.indexOf(searchTerm)!==-1){
                //    foundItems.push(entry);
                //}
            //});
        })
        .catch(function (error) {
            throw new Error("Error");
        });

        return service.foundItems;
    };
}

})();

