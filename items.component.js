(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
    templateUrl: 'category-items.template.html',    
    bindings: {
        items: '<',
    }
});


})();