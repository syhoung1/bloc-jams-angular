(function () {
    function CollectionCtrl () {
        this.albums = [];
        for (var i = 0; i < 12; i++) {
            /* global albumPicasso */
            this.albums.push(angular.copy(albumPicasso));
        }
    }
    
    angular /* global angular */
        .module('blocJams')
        .controller('CollectionCtrl', CollectionCtrl);
    
})();
