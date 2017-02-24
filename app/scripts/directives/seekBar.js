(function () {
    function seekBar($document) {
        var calculatePercent = function (bar, event) {
            var offsetX = event.pageX - bar.offset().left;
            var barWidth = bar.width();
            var offsetXPercent = offsetX / barWidth;

            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);

            return offsetXPercent;
        };

        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: {
                onChange: '&'
            },
            link: function (scope, element, attributes) {
                scope.value = 0;
                scope.max = 100;

                var percentageString = function () {
                    var value = scope.value;
                    var max = scope.max;
                    var ratio = value / max;
                    return ratio * 100 + '%';
                };

                var bar = $(element);
                /* global $*/

                attributes.$observe('value', function (newValue) {
                    scope.value = newValue;
                });

                attributes.$observe('max', function (newValue) {
                    scope.max = newValue;
                });

                scope.fillstyle = function () {
                    return {width: percentageString()};
                };

                scope.onClickSeekBar = function (event) {
                    var percent = calculatePercent(bar, event);
                    scope.value = percent * scope.max;
                    notifyOnChange(scope.value);
                };

                scope.trackThumb = function () {
                    $document.bind('mousemove.thumb', function (event) {
                        var percent = calculatePercent(bar, event);

                        scope.$apply(function () {
                            scope.value = percent * scope.max;
                            notifyOnChange(scope.value);
                        });
                    });

                    $document.bind('mouseup.thumb', function (event) {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };

                var notifyOnChange = function (newValue) {
                    if (typeof scope.onChange === 'function') {
                        scope.onChange({value: newValue});
                    }
                };

                scope.thumbStyle = function () {
                    return {left: percentageString()};
                };
            }
        };
    }

    angular /* global angular */
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();
