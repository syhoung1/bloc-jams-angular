(function () {
    function timecode() {
        return function (time) {
            var seconds = Number.parseFloat(time);

            if (Number.isNaN(seconds)) {
                return '-:--';
            }

            var minutes = Math.floor(seconds / 60);
            var secondsTens = Math.floor(seconds % 60 / 10);
            var secondsOnes = Math.floor(seconds % 60 % 10);
            var output = minutes + ':' + secondsTens + secondsOnes;

            return output;
        };
    }

    angular /* global angular */
    .module('blocJams')
    .filter('timecode', timecode);
})();
