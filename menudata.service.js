(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath){
    var service = this;   
    
    service.currentItems = [];
    
    service.getAllCategories = function(){
        return $http({
            method: "GET",
            url: (ApiBasePath + "/categories.json")
        })
		.then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log("Something went terribly wrong.");
        });
    };
    
    service.getItemsForCategory = function(categoryShortName){
       return $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json"),
            params: {
                category: categoryShortName
            }
        })
		.then(function (response) {
            return response.data.menu_items;
        })
        .catch(function (error) {
            console.log("Something went terribly wrong.");
        });
    };
    
}

})();