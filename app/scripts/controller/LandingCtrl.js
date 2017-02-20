(function () {
    function LandingCtrl () {
        this.heroTitle = "Turn the music UP!";
    }
    
    angular /* global angular */
        .module('blocJams')
        .controller('LandingCtrl', LandingCtrl);
})();
