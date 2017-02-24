(function () {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayerObject = {};

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
                stopSong();
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function () {
                $rootScope.$apply(function () {
                    SongPlayerObject.currentTime = currentBuzzObject.getTime();
                });
            });

            SongPlayerObject.currentSong = song;
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

        SongPlayerObject.currentSong = null;

        /**
        * @desc Gives the time that the current song has played for in seconds
        * @type {Number}
        */

        SongPlayerObject.currentTime = null;

        /**
        * @desc plays selected song and changes song.playing to true
        * @type {Number}
        */

        SongPlayerObject.volume = 80;

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
        * @function stopSong
        * @desc stops currently active song and sets song.playing to null
        * @param {Object} song
        */

        var stopSong = function () {
            currentBuzzObject.stop();

            if (SongPlayerObject.currentSong !== null) {
                SongPlayerObject.currentSong.playing = false;
            }
        };

        /**
        * @function play()
        * @desc plays selected song item. Stops previously playing song if there is one.
        * @param {Object} song
        */

        SongPlayerObject.play = function (songItem) {
            /* global buzz */
            var song = songItem || SongPlayerObject.currentSong;
            var firstSong = currentAlbum.songs[0];

            if (SongPlayerObject.currentSong === null) {
                setSong(firstSong);
                playSong(firstSong);
            } else if (song !== SongPlayerObject.currentSong) {
                setSong(song);
                playSong(song);
            } else if (song === SongPlayerObject.currentSong) {
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

        SongPlayerObject.pause = function (songItem) {
            var song = songItem || SongPlayerObject.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
        * @function previous ()
        * @desc plays the song previous to the current song in the songs array
        * @param none
        */

        SongPlayerObject.previous = function () {
            var currentSongIndex = getSongIndex(SongPlayerObject.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
        * @function next ()
        * @desc plays the next song in the songs array
        * @param none
        */

        SongPlayerObject.next = function () {
            var currentSongIndex = getSongIndex(SongPlayerObject.currentSong);
            currentSongIndex++;

            if (currentSongIndex >= currentAlbum.songs.length) {
                stopSong();
                currentSongIndex = null;
                SongPlayerObject.currentSong = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */

        SongPlayerObject.setCurrentTime = function (time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        /**
        * @function setCurrentVolume
        * @desc sets the volume
        * @param {Number} volume
        */

        SongPlayerObject.setCurrentVolume = function (volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
        };

        return SongPlayerObject;
    }

    angular /* global angular */
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
