(function () {
    function SongPlayer (Fixtures) {
        var SongPlayer = {};
        
        /**
        * @desc current album object
        * @type {Object}
        */
        
        var currentAlbum = Fixtures.getAlbum();
        
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
                    SongPlayer.currentSong.playing = null;
                }
                
                currentBuzzObject = new buzz.sound(song.audioUrl, {
                    formats: ['mp3'],
                    preload: true
                });
                
                SongPlayer.currentSong = song;
        };
        
        /**
        * @function getSongIndex
        * @desc returns the index of the current song in the current album
        * @param {Object} song
        */
        
        var getSongIndex = function (song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
        * @desc currently playing song
        * @type {boolean}
        */
        
        SongPlayer.currentSong = null;
        
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
            song = song || SongPlayer.currentSong;
            if (song !== SongPlayer.currentSong) {
                setSong(song);
                playSong(song);
                
            } else if (song === SongPlayer.currentSong) {
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
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        * @function previous ()
        * @desc plays the song previous to the current song in the songs array
        * @param none
        */
        
        SongPlayer.previous = function () {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    }
    
    angular /* global angular */
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
