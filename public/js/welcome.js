$(() => {
	$('.fade-in.title').animate({opacity: 1}, 2500);
	$(document).scroll(() => {
		$('.fade-in.overlay-boxes').animate({opacity: 1}, 1000);
	})
})