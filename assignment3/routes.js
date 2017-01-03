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
        templateUrl: 'main.template.html'
    })
    
    .state('itemDetail', {
        url: '/item-detail/{itemId}',
        templateUrl: 'item-detail.template.html',
        controller: 'ItemDetailController as itemDetail',
        resolve: {
            item: ['$stateParams', 'MenuSearchService', 
                function ($stateParams,MenuSearchService){
                    return MenuSearchService.getFetchedItem($stateParams.itemId);
                }
            ]
        }
    });
}

})();