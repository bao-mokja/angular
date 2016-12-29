(function () {
'use strict';

angular.module('NarrowItDownApp')
.service('MenuSearchService', MenuSearchService);

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