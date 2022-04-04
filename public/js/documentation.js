let slide_in = {
	opacity: 1,
	marginLeft: 0,
	width: '100%'
};
let fade_in = {
	opacity: 1
};

$(() => {
	$('.slide-from-left').each(function() {
		let width = $(this).outerWidth();
		$(this).css({
			'width': width,
			'margin-left': -1*width
		});
	});

	$('.fade-in.title').animate(fade_in, 2500);

	let photo_perm = $('.photo-perms.fade-in');
	let copywrite = $('.copywrite.slide-from-left');
	let worklog = $('.worklog.slide-from-left');
	let sources = $('.resources.slide-from-left');
	
	let copy_offset = copywrite.offset().top+copywrite.outerHeight()/2-$(window).height();
	let work_offset = worklog.offset().top+worklog.outerHeight()/2-$(window).height();
	let source_offset = sources.offset().top+sources.outerHeight()/2-$(window).height();

	$(document).scroll(() => {
		let scroll = $(this).scrollTop();
		
		if (scroll < 520) {
			let brightness = 78-scroll/13;
			$('.image-full').css({
				'filter': `brightness(${brightness}%)`
			});
		}


		if (photo_perm.css('opacity') == '0')
			photo_perm.animate(fade_in, 1000);
		
		if (scroll > copy_offset) {
			if (copywrite.css('opacity') == '0')
				copywrite.animate(slide_in, 1000);
		}
		if (scroll > work_offset) {
			if (worklog.css('opacity') == '0')
				worklog.animate(slide_in, 1000);
		}
		if (scroll > source_offset) {
			if (sources.css('opacity') == '0')
				sources.animate(slide_in, 1000);
		}
	})
})