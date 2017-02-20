(function () {
    function CollectionCtrl (Fixtures) {
        this.albums = Fixtures.getCollection();
    }
    
    angular /* global angular */
        .module('blocJams')
        .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();
