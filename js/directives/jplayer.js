/**
 * jPlayer Directive
 * @see https://amitgharat.wordpress.com/2012/11/25/using-jplayer-in-your-angular-application/
 */

angular
    .module('RDash')
    .directive('jplayer', jPlayer);

function jPlayer() {
    return {
		restrict: 'EA',
		template: '<div></div>',
		link: function(scope, element, attrs) {
			var $control = element,
				$player = $control.children('div'),
				cls = 'glyphicon-pause';

			var calcTime = function (time) {
				var minutes = Math.floor(time / 60);
				var seconds = Math.floor(time - minutes * 60);

				if (seconds < 10) {
					seconds = '0' + seconds;
				}

				return minutes + ':' + seconds;
			};

			var updatePlayer = function() {
				var audioFile = scope.$eval(attrs.audio).url;

				//	console.log(audioFile);
				$player.jPlayer({
					// Flash fallback for outdated browser not supporting HTML5 audio/video tags
					// http://jplayer.org/download/
					swfPath: 'js/jplayer/',
					supplied: 'mp3',
					solution: 'html, flash',
					preload: 'none',
					wmode: 'window',
					ready: function () {
						$player
							//.jPlayer("setMedia", {mp3: scope.$eval(attrs.audio)})
							.jPlayer("setMedia", {mp3: audioFile })
							.jPlayer(attrs.autoplay === 'true' ? 'play' : 'stop');
					},
					/**
					 * Event handler for when jPlayer track is ready
					 * This function's purpose is to populate the duration for inline player
					 * @param {Object} event - jPlayer event data
					 */
					loadeddata: function(event){ // calls after setting the song duration


						var songDuration = event.jPlayer.status.duration;

						var div = $control[0].id;
						var col = div.split('-')[1];
						var id = div.split('-')[2];


						var time = calcTime(songDuration);


						// Set it in the HTML
						document.getElementById('duration-' + col + '-' + id).innerHTML = time;




					},
					/**
					 * Event handler for when jPlayer time elapsed changes
					 * Occurs every 250ms
					 * This functions purpose is to update time elapsed for inline player
					 * @param {Object} event - jPlayer event data
					 */
					timeupdate: function(event) {

							var timeElapsed = Math.floor(event.jPlayer.status.currentTime);
							var time = calcTime(timeElapsed);

							var div = $control[0].id;
							var col = div.split('-')[1];
							var id = div.split('-')[2];

							// Set it in the HTML
							document.getElementById('time-' + col + '-' + id).innerHTML = time + '&nbsp;/&nbsp;';


					},
					play: function() {
						$control.addClass(cls);

						if (attrs.pauseothers === 'true') {
							$player.jPlayer('pauseOthers');
						}
					},
					pause: function() {
						$control.removeClass(cls);
					},
					stop: function() {
						$control.removeClass(cls);
					},
					ended: function() {
						$control.removeClass(cls);
					}
				})
					.end()
					.unbind('click').click(function(e) {
						$player.jPlayer($control.hasClass(cls) ? 'pause' : 'play');
					});
			};

			scope.$watch(attrs.audio, updatePlayer);
			updatePlayer();
		}
	};
};

