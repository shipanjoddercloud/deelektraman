(function( $ ) {
	'use strict';
		$(document).ready(function() {
		setTimeout(function() {
			$('.wt-related-products-cart').css('opacity', '1');
		}, 100);
	});

	// Also handle dynamic loading scenarios
	$(window).on('load', function() {
		$('.wt-related-products-cart').css('opacity', '1');
	});

})( jQuery );
