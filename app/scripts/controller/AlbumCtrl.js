(function () {
    function AlbumCtrl (Fixtures, SongPlayer) {
        this.albumData = Fixtures.getAlbum();
        /* global albumPicasso */
        this.songPlayer = SongPlayer;
    }
    
    angular /* global angular */
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();
