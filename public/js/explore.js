$(() => {
	$('.fade-in.title').animate({opacity: 1}, 2500);
	$('.fade-in.subtitle').animate({opacity: 1}, 3500);

	let boxes = $('.boxes > .fade-in');

	$(document).scroll(() => {
		let scroll = $(this).scrollTop();

		if (scroll < 700) {
			let brightness = 78-scroll/17;
			$('.image-full').css({
				'visibility': 'visible',
				'filter': `brightness(${brightness}%)`
			})
		}

		let offset = boxes.offset().top+boxes.outerHeight()-$(window).height();

		if (scroll > offset)
			if (boxes.css('opacity') == '0')
				boxes.animate({opacity: 1}, 1000);
	});
});