(function () {
    function SongPlayer ($rootScope, Fixtures) {
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
                stopSong();
            }
<<<<<<< HEAD

=======
                
>>>>>>> assignment-8
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
<<<<<<< HEAD
            currentBuzzObject.bind('timeupdate', function () {
               $rootScope.$apply(function () {
                  SongPlayer.currentTime = currentBuzzObject.getTime(); 
               });
            });
            
=======
>>>>>>> assignment-8
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
        * @desc Gives the time that the current song has played for in seconds
        * @type {Number}
        */
        
        SongPlayer.currentTime = null;
        
        /**
        * @desc plays selected song and changes song.playing to true
        * @type {Number}
        */
        
        SongPlayer.volume = 80;
        
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
             
            if (SongPlayer.currentSong !== null) {
                SongPlayer.currentSong.playing = false;
            }
        };
        
        /**
        * @function play()
        * @desc plays selected song item. Stops previously playing song if there is one.
        * @param {Object} song
        */
        
        SongPlayer.play = function (song) {
            /* global buzz */
            song = song || SongPlayer.currentSong;
            var firstSong = currentAlbum.songs[0];
            
            if (SongPlayer.currentSong === null) {
                setSong(firstSong);
                playSong(firstSong);
            } else if (song !== SongPlayer.currentSong) {
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
        
        SongPlayer.next = function () {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
<<<<<<< HEAD
            if (currentSongIndex > currentAlbum.songs.length) {
                stopSong();
=======
            if (currentSongIndex >= currentAlbum.songs.length) {
                // SongPlayer.currentSongIndex = null;
                SongPlayer.currentSong = null;
>>>>>>> assignment-8
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
        
        SongPlayer.setCurrentTime = function (time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        /**
        * @function setCurrentVolume
        * @desc sets the volume
        * @param {Number} volume
        */
        
        SongPlayer.setCurrentVolume = function (volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
        };
        
        return SongPlayer;
    }
    
    angular /* global angular */
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
