//\\///////////////
// #== main js file
//\\///////////////

$(document).ready(function() {

	$('#fullpage').fullpage({
		menu: '#fullPage-nav',
		anchors: ['top', 'projects', 'contact'],
		fixedElements: '#fixed-navbar',
		paddingBottom: '0px',
		paddingTop: '0px',
		sectionsColor: [dg.assets.colors.lightest, dg.assets.colors.primary, dg.assets.colors.lightest],
		slidesNavigation: true,
		loopHorizontal: false,
		afterLoad: function(anchorLink, index) {
			dg.fullPageCallbacks.afterLoad.animateIntro(anchorLink, index);
		},
		onLeave: function(i, ni, d) {
			dg.fullPageCallbacks.onLeave.menuColors(i, ni, d);
			dg.fullPageCallbacks.onLeave.navArrows(i, ni);
			dg.fullPageCallbacks.onLeave.toggleNavView(i, ni, d);
		},
		onSlideLeave: function(al, i, si, d, nsi) {
			dg.fullPageCallbacks.onSlideLeave.toggleNavView(al, i, si, d, nsi);
		}
	});

	$('.email a').on('mouseover', function(e) {
		this.href = 'mailto:' + $(this).data('user') + '@' + $(this).data('domain') + $(this).data('suffix');
	}).on('mouseout', function() {
		this.href = '';
	}).on('click', function(e) {
		this.href = 'mailto:' + $(this).data('user') + '@' + $(this).data('domain') + $(this).data('suffix');
		$(this).trigger('click');
	});

});
var dg = {
	assets: {
		"colors": {
			primary: "#5493c0",
			success: "#66b266",
			info: "#60a0c3",
			warning: "#f4de95",
			danger: "#f4a062",
			lightest: "#efefef"
		}
	},
	fullPageCallbacks: {
		afterLoad: {
			animateIntro: function(anchorLink, index) {
				var ready = $('.ready').length;
				var dfr = $.Deferred();
				var doneCallback = function(deferred) {
					setTimeout(function() {
						deferred.resolve();
					}, 1000);
					return deferred.promise();
				};
				if (ready < 1) {
					$('#fullpage').fadeTo('normal', 1, function() {
						$('.title').addClass('ready');
						doneCallback(dfr);
					});
				} else {
					dfr.resolve();
				}
				$.when(dfr).then(function(data) {
					$('.title').addClass('finished').removeClass('ready');
				});
			}
		},
		onLeave: {
			menuColors: function(i, ni, d) {
				if (ni === 1) {
					$('nav').removeClass('navbar-inverse').addClass('navbar-default');
				} else if (ni === 2) {
					if (d === 'down') {
						$('nav').removeClass('navbar-default navbar-inverse');
						setTimeout(function() {
							$('nav').addClass('navbar-inverse');
						}, 300);
					} else {
						$('nav').addClass('navbar-inverse').removeClass('navbar-default');
					}
				} else {
					$('nav').removeClass('navbar-inverse navbar-default');
					setTimeout(function() {
						$('nav').addClass('navbar-default');
					}, 300);
				}
			},
			navArrows: function(i, ni) {
				if (ni == 2) {
					$('.fp-prev,.fp-next').addClass('opaque');
				} else {
					$('.fp-prev,.fp-next').removeClass('opaque');
				}
			},
			toggleNavView: function(i, ni) {
				if (ni !== 2) {
					$('#fixed-navbar').removeClass('translucent');
				} else {
					setTimeout(function() {
						if (window.location.hash.indexOf('/') !== -1) {
							$('#fixed-navbar').addClass('translucent');
						}
					}, 1);
				}
			}
		},
		onSlideLeave: {
			toggleNavView: function(al, i, si, d, nsi) {
				if (nsi === 0) {
					$('#fixed-navbar').removeClass('translucent');
				} else {
					$('#fixed-navbar').addClass('translucent');
				}
			}
		}
	}
};