(function () {
    function LandingCtrl () {
        this.heroTitle = "Turn the music up!";
    }
    
    angular /* global angular */
        .module('blocJams')
        .controller('LandingCtrl', LandingCtrl);
})();