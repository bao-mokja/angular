(function () {
'use strict';

angular.module('NarrowItDownApp')
.component('foundItems', {
    templateUrl: 'menuitems.html',    
    bindings: {
        items: '<',
        onRemove: '&'  
    }
});


})();