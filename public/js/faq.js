let slide_in = {
	width: '100%',
	marginLeft: 0,
	opacity: 1
};
let fade_in = {
	opacity: 1
};
let grow_in = {
	width: '85%'
}

$(() => {
	$('.slide-from-left').each(function() {
		let width = $(this).outerWidth();
		$(this).css({
			'width': width,
			'margin-left': -1*width
		});
	});
	$('.slide-from-right').each(function() {
		let width = $(this).outerWidth();
		let margin = width + $(this).css('margin-left');
		$(this).css({
			'width': width,
			'margin-left': margin
		});
	});

	$('.fade-in.title').animate(fade_in, 1000);
	$('.fade-in.subtitle').animate(fade_in, 2000);
	$('hr.grow-in').delay(1000).animate(grow_in, 1000);

	let faq = $('.faq');
	let bullet = $('.bullet-cell');
	let offsets = faq.map(function () {
		return $(this).offset().top+$(this).outerHeight()*1.5-$(window).height();
	});

	$(document).scroll(() => {
		let scroll = $(this).scrollTop();

		offsets.each((i) => {
			if (scroll > offsets[i])
				if (faq.eq(i).css('opacity') == '0') {
					faq.eq(i).animate(slide_in, 1000);
					bullet.eq(i).animate(slide_in, 1000);
				}
		})
	})
})