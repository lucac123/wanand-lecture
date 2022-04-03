let slide_in = {
	width: '100%',
	marginLeft: 0,
	opacity: 1
};

$(() => {
	(() => {
		$('.slide-from-left').each(function() {
			let width = $(this).outerWidth();
			$(this).css({
				'width': width,
				'margin-left': -1*width,
				'opacity': 0
			});
		});
		$('.slide-from-right').each(function() {
			let width = $(this).outerWidth();
			let margin = width + $(this).css('margin-left');
			$(this).css({
				'width': width,
				'margin-left': margin,
				'opacity': 0
			});
		});
	})();

	$('.fade-in.title').animate({opacity: 1}, 2500);
	let overlay_boxes = $('.overlay-boxes');
	let box_left = $('.box.slide-from-left');
	let about_title = $('.slide-from-right#about-title')
	let box_right = $('.box.slide-from-right');

	let review_title = $('.slide-from-left#review-title');
	let review_image_left = $('.slide-from-left.review-image');
	let review_left = $('.slide-from-left.review-block');
	let review_right = $('.slide-from-right.review-block');
	let review_image_right = $('.slide-from-right.review-image');

	let reviews = $('.reviews-right .review:first');
	let about = $('.box.slide-from-right > h6:first');

	$(document).scroll(() => {
		let scroll = $(this).scrollTop();

		if (scroll < 700) {
			let brightness = 78-scroll/17;
			$('.image-full').css({
				'visibility': 'visible',
				'filter': `brightness(${brightness}%)`
			})
		}
		else
			$('.image-full').css({
				'visibility': 'hidden'
			})

		let about_offset = about.offset().top-about.outerHeight()-$(window).height();

		let review_offset = reviews.offset().top-reviews.outerHeight()-$(window).height();

		let review_offset_low = review_left.offset().top-review_left.outerHeight()-$(window).height();

		if (overlay_boxes.css('opacity') == '0')
			overlay_boxes.animate({opacity: 1}, 1000);

		if (scroll > about_offset) {
			if (about_title.css('opacity') == '0') {
				about_title.animate(slide_in, 800);
				box_left.animate(slide_in, 1000);
				box_right.animate(slide_in, 1000);
			}
		}

		if (scroll > review_offset) {
			if (review_title.css('opacity') == '0') {
				review_title.animate(slide_in, 800);
				review_right.animate(slide_in, 1000);
				review_image_left.animate(slide_in, 1200);
			}
		}
		if (scroll > review_offset_low) {
			if (review_left.css('opacity') == '0') {
				review_left.animate(slide_in, 1200);
				review_image_right.animate(slide_in, 1000);
			}
		}
	});
})