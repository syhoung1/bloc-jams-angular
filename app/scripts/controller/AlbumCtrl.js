(function () {
    function AlbumCtrl () {
        this.albumData = albumPicasso;
        /* global albumPicasso */
    }
    
    angular /* global angular */
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();
