(function () {
    function AlbumCtrl (Fixtures) {
        this.albumData = Fixtures.getAlbum();
        /* global albumPicasso */
    }
    
    angular /* global angular */
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();
