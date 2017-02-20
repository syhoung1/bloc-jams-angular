(function () {
    function SongPlayer () {
        var SongPlayer = {};
        
        /**
        * @desc currently playing song
        * @type {boolean}
        */
        
        var currentSong = null;
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        
        var setSong = function (song) {
            if (currentBuzzObject) {
                    currentBuzzObject.stop();
                    currentSong.playing = null;
                }
                
                currentBuzzObject = new buzz.sound(song.audioUrl, {
                    formats: ['mp3'],
                    preload: true
                });
                
                currentSong = song;
        };
        
        /**
        * @function playSong
        * @desc plays selected song and changes song.playing to true
        * @param {Object} song
        */
        
        var playSong = function (song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /**
        * @function play()
        * @desc plays selected song item. Pauses previously playing song if there is one.
        * @param {Object} song
        */
        
        SongPlayer.play = function (song) {
            /* global buzz */

            if (song !== currentSong) {
                setSong(song);
                playSong(song);
                
            } else if (song === currentSong) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        
        /**
        * @function pause ()
        * @desc pauses selected song if it is currently playing
        * @param {Object} song
        */
        
        SongPlayer.pause = function (song) {
                currentBuzzObject.pause();
                song.playing = false;
        };
        
        return SongPlayer;
    }
    
    angular /* global angular */
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
