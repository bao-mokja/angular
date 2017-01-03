(function () {
'use strict';

angular.module('NarrowItDownApp')
.component('foundItems', {
    templateUrl: 'menuitems.html',    
    controller: FoundItemsController,
    bindings: {
        items: '<',
        onRemove: '&'  
    }
});

function FoundItemsController(){
    var $ctrl = this;
    $ctrl.remove = function (myIndex) {
        $ctrl.onRemove({ index: myIndex });
    };
}

})();