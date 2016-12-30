(function () {
'use strict';

angular.module('NarrowItDownApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');
    
    // *** Set up UI states ***
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'main.template.html',
        resolve: {
            items: ['MenuSearchService', function (MenuSearchService) {
                return MenuSearchService.getFetchedItems();
            }]
        }
    })
    
    .state('home.itemDetail', {
        //url: '/item-detail/{itemId}',
        templateUrl: 'item-detail.template.html',
        controller: 'ItemDetailController as itemDetail',
        params: {
            itemId: null
        }
    });
}

})();