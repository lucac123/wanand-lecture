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

let subject = "science";
let lecture;


$(() => {
	fetch('js/lectures.json')
		.then(res => res.json())
		.then(start);		
	});

let start = (data) => {
	data.science.forEach((lecture, index) => {
		$('.content').append('<div class="lecture science slide-from-left"></div>');
		let cur_lecture = $('.content > .lecture:last-of-type');
		cur_lecture.css({'grid-row': index+1});
		cur_lecture.append('<div class="lecture-header"></div>');
		cur_lecture.children('.lecture-header').append(
			`<h2 class="lecture-title">${lecture.title}</h2>`,
			'<a href="https://iowacityschools-org.zoom.us/j/93088692698?pwd=Wnc0OEdIK202ZXZkcnRYQWRDYlBydz09" class="small-button" target="_blank">Link</a>');
		cur_lecture.append(
			`<p class="lecture-description">${lecture.description}</p>`,
			`<p class="details">${lecture.details}</p>`,
			'<p>Click on the link button to be redirected to the lecture</p>');
	})
	data.tech.forEach((lecture, index) => {
		$('.content').append('<div class="lecture tech slide-from-left"></div>');
		let cur_lecture = $('.content > .lecture:last-of-type');
		cur_lecture.css({'grid-row': index+1});
		cur_lecture.append('<div class="lecture-header"></div>');
		cur_lecture.children('.lecture-header').append(
			`<h2 class="lecture-title">${lecture.title}</h2>`,
			'<a href="https://iowacityschools-org.zoom.us/j/93088692698?pwd=Wnc0OEdIK202ZXZkcnRYQWRDYlBydz09" class="small-button" target="_blank">Link</a>');
		cur_lecture.append(
			`<p class="lecture-description">${lecture.description}</p>`,
			`<p class="details">${lecture.details}</p>`,
			'<p>Click on the link button to be redirected to the lecture</p>');
	})
	$('#science-button').click(() => {
		$('#science-button').css({'background-color': '#323135'});
		$('#tech-button').css({'background-color': '#5f5d63'});
		subject = "science";
		$('#subject-num').text('1');
		lecture = $('.lecture.science');
		let remove = $('.lecture.tech');
		remove.each(function (i) {
			if ($(this).css('opacity') != '0') {
				let width = $(this).outerWidth();
				$(this).animate({
					width: width,
					marginLeft: -1*width,
					opacity: 0
				}, 1000);
				lecture.eq(i).delay(1000).animate(slide_in, 1000);
			}
		});
	});
	$('#tech-button').click(() => {
		$('#tech-button').css({'background-color': '#323135'});
		$('#science-button').css({'background-color': '#5f5d63'});
		subject = "tech";
		$('#subject-num').text('2');
		lecture = $('.lecture.tech');
		let remove = $('.lecture.science');
		remove.each(function (i) {
			if ($(this).css('opacity') != '0') {
				let width = $(this).outerWidth();
				$(this).animate({
					width: width,
					marginLeft: -1*width,
					opacity: 0
				}, 1000);
				lecture.eq(i).delay(1000).animate(slide_in, 1000);
			}
		});
	});

	$('.slide-from-left').each(function() {
		let width=$(this).outerWidth();
		$(this).css({
			'width': width,
			'margin-left': -1*width
		});
	});

	$('.fade-in.title').animate(fade_in, 1000);
	$('.fade-in.subtitle').animate(fade_in, 2000);
	$('hr.grow-in').delay(1000).animate(grow_in, 1000);
	$('.subject.fade-in').delay(1500).animate(fade_in, 1000);

	lecture = $('.lecture.science');
	let offsets = lecture.map(function () {
		return $(this).offset().top-$(window).height();
	});

	$(document).scroll(() => {
		let scroll = $(this).scrollTop();
		offsets.each((i) => {
			if (scroll > offsets[i])
				if (lecture.eq(i).css('opacity') == '0') {
					lecture.eq(i).animate(slide_in, 1000);
				}
		});
	});
}
