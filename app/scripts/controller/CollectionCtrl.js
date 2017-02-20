(function () {
    function CollectionCtrl (Fixtures) {
        this.albums = [];
        for (var i = 0; i < 12; i++) {
            /* global albumPicasso */
            this.albums.push(Fixtures.getAlbum());
        }
    }
    
    angular /* global angular */
        .module('blocJams')
        .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();
